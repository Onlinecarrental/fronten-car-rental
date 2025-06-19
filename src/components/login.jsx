import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.role === 'customer') {
          navigate('/home');
        } else if (userData.role === 'agent') {
          navigate('/agent');
        } else if (userData.role === 'admin') {
          navigate('/admin');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  // Auto-fill email and password if redirected from signup
  useEffect(() => {
    if (location.state && location.state.email) setEmail(location.state.email);
    if (location.state && location.state.password) setPassword(location.state.password);
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Attempting login with:', { email });
      
      // Validate email format
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Validate password
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', result.user.email);
      
      const userEmail = result.user.email.toLowerCase();
      const userId = result.user.uid;

      // First check in users collection
      const userDoc = await getDoc(doc(db, "users", userId));
      
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === 'agent') {
          setError('Please use agent login page');
          return;
        }
        
        // Store user data and role type
        const userData = {
          email: userEmail,
          role: role, // Use the actual role from database
          uid: userId
        };

        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect based on role
        if (role === 'admin') {
          localStorage.setItem('admin', 'true');
          navigate('/admin', { replace: true });
        } else {
          localStorage.setItem('customer', 'true');
          navigate('/home', { replace: true });
        }
      } else {
        // If not found in users collection, check in agent collection
        const agentDoc = await getDoc(doc(db, "agent", userId));
        if (agentDoc.exists()) {
          const role = agentDoc.data().role;
          if (role === 'admin') {
            // Allow admin to login from agent collection
            const userData = {
              email: userEmail,
              role: 'admin',
              uid: userId
            };
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('admin', 'true');
            navigate('/admin', { replace: true });
          } else {
            setError('Please use agent login page');
          }
          return;
        }
        
        setError('User not found in the system');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address format');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection');
          break;
        default:
          setError(error.message || 'Login failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left: Logo */}
        <div className="bg-gray-300 flex flex-col justify-center items-center px-10 py-8">
          <div className="rounded-full border-4 border-yellow-400 p-2 mb-4">
            <img
              src="https://i.ibb.co/6b7bQ7y/gpgcws-logo.png"
              alt="Logo"
              className="h-32 w-32 object-contain"
            />
          </div>
          <div className="text-center font-bold text-lg tracking-widest">
            GPGCWS<br />WEB PORTAL
          </div>
        </div>
        {/* Right: Form */}
        <div className="flex flex-col justify-center px-10 py-8 w-96">
          <h2 className="text-xl font-bold mb-2">Welcome to Login</h2>
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className={`w-full bg-yellow-300 text-black font-semibold py-2 rounded-md mt-2 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="text-xs mt-3 text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Signup Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
