import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-yFdLVn5LA8iu81C2seW5nt6OHiAk5x0',
  authDomain: 'car-rental-dc2f3.firebaseapp.com',
  projectId: 'car-rental-dc2f3',
  storageBucket: 'car-rental-dc2f3.appspot.com',
  messagingSenderId: '779267774310',
  appId: '1:779267774310:web:474d1a571952c923fcdaa7',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
