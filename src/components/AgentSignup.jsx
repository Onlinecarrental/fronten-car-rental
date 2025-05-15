import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

// Cloudinary Upload Function
const uploadToCloudinary = async (file, userId, fileType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'upload_preset');
  formData.append('public_id', `agents/${userId}/license/${fileType}`);

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dlinqw87p/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error('Cloudinary upload error:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};

const AgentSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [license, setLicense] = useState('');
  const [licensePic, setLicensePic] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validation helpers
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) =>
    /^\d{11}$/.test(phone);
  const validateCnic = (cnic) =>
    /^\d{5}-\d{7}-\d{1}$/.test(cnic);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Phone number must be exactly 11 digits.');
      return;
    }
    if (!validateCnic(cnic)) {
      setError('CNIC must be in the format 12345-1234567-1');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!cnicFront || !cnicBack) {
      setError('Please upload both CNIC front and back images.');
      return;
    }
    if (!license) {
      setError('Please enter license card number.');
      return;
    }
    if (!licensePic) {
      setError('Please upload license card image.');
      return;
    }

    try {
      // Step 1: Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Step 2: Upload images to Cloudinary
      const frontUrl = await uploadToCloudinary(cnicFront, userId, 'cnic_front');
      const backUrl = await uploadToCloudinary(cnicBack, userId, 'cnic_back');
      const licenseUrl = await uploadToCloudinary(licensePic, userId, 'license_pic');

      // Step 3: Save agent data to Firestore (collection: agent)
      await setDoc(doc(db, 'agent', userId), {
        name,
        email,
        phone,
        cnic,
        cnicFrontUrl: frontUrl,
        cnicBackUrl: backUrl,
        license,
        licensePicUrl: licenseUrl,
        createdAt: new Date(),
        role: "agent"
      });

      alert('Signup successful! Redirecting to login...');
      navigate('/agent-login', { state: { email, password } });

    } catch (error) {
      setError('Signup Error: ' + error.message);
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
          <h2 className="text-xl font-bold mb-2">Agent Signup</h2>
          <form onSubmit={handleSignup} className="space-y-3">
            {error && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded">{error}</div>
            )}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              placeholder="Phone Number (11 digits)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              maxLength={11}
            />
            <input
              type="text"
              placeholder="CNIC (12345-1234567-1)"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              maxLength={15}
            />
            <label className="block mt-2">CNIC Front:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCnicFront(e.target.files[0])}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <label className="block mt-2">CNIC Back:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCnicBack(e.target.files[0])}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="License Card Number"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <label className="block mt-2">License Card Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLicensePic(e.target.files[0])}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-yellow-300 text-black font-semibold py-2 rounded-md mt-2 hover:bg-yellow-400 transition"
            >
              Signup
            </button>
          </form>
          <div className="text-xs mt-3 text-center">
            Already have an account?{' '}
            <Link to="/agent-login" className="text-blue-600 hover:underline">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSignup;