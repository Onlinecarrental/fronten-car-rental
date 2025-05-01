import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate, useLocation } from 'react-router-dom';

const AgentLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('agent')) {
      navigate('/agent');
    }
  }, [navigate]);

  // Auto-fill email and password if redirected from signup
  useEffect(() => {
    if (location.state && location.state.email) setEmail(location.state.email);
    if (location.state && location.state.password) setPassword(location.state.password);
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('agent', JSON.stringify(result.user)); // sirf localStorage
      navigate('/agent');
    } catch (error) {
      alert('Login failed: ' + error.message);
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
          <h2 className="text-xl font-bold mb-2">Agent Login</h2>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black font-semibold py-2 rounded-md mt-2 hover:bg-yellow-400 transition"
            >
              Login
            </button>
          </form>
          <div className="text-xs mt-3 text-center">
            Don't have an account?{' '}
            <a href="/agent-signup" className="text-blue-600 hover:underline">
              Signup Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;