import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecommerce-a61db.firebaseapp.com",
  projectId: "ecommerce-a61db",
  storageBucket: "ecommerce-a61db.firebasestorage.app",
  messagingSenderId: "642423371237",
  appId: "1:642423371237:web:012c860369c96921d8eb0c",
  measurementId: "G-XPQJ4L4V85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}

