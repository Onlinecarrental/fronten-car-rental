import React, { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// ✅ Cloudinary Upload Function (fixed)
const uploadToCloudinary = async (file, userId, fileType) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'upload_preset'); // your preset name
  formData.append('public_id', `users/${userId}/cnic/${fileType}`); // virtual folder path

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

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      // Step 1: Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Step 2: Upload CNIC images to Cloudinary
      const frontUrl = cnicFront ? await uploadToCloudinary(cnicFront, userId, 'cnic_front') : '';
      const backUrl = cnicBack ? await uploadToCloudinary(cnicBack, userId, 'cnic_back') : '';

      // Step 3: Save user data to Firestore
      await setDoc(doc(db, 'users', userId), {
        name,
        email,
        phone,
        cnic,
        cnicFrontUrl: frontUrl,
        cnicBackUrl: backUrl,
        createdAt: new Date(),
      });

      // Step 4: Auto-login and redirect
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem('user', JSON.stringify({ email }));
      navigate('/dashboard');

    } catch (error) {
      console.error('Signup Error:', error);
      alert('Signup Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Sign Up</h2>
      <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input className="input" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <input className="input" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input className="input" placeholder="CNIC" value={cnic} onChange={(e) => setCnic(e.target.value)} required />
      <label className="block mt-2">CNIC Front:</label>
      <input className="input" type="file" onChange={(e) => setCnicFront(e.target.files[0])} required />
      <label className="block mt-2">CNIC Back:</label>
      <input className="input" type="file" onChange={(e) => setCnicBack(e.target.files[0])} required />
      <button type="submit" className="btn-blue mt-4">Sign Up</button>
    </form>
  );
};

export default Signup;
