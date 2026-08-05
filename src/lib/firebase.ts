import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";

const apiKey = process.env.VITE_FIREBASE_API_KEY || "AIzaSyC0Y1YYYUNpz8ImMwj3i6lqw_v0mSAhqfQ";
export const isFirebaseConfigured = Boolean(apiKey && !apiKey.includes("DummyKey"));

// Your web app's Firebase configuration provided by user
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "planejadorbncc.firebaseapp.com",
  projectId: "planejadorbncc",
  storageBucket: "planejadorbncc.firebasestorage.app",
  messagingSenderId: "986638085131",
  appId: "1:986638085131:web:c6fe21758dd3f066cfeb0e",
  measurementId: "G-9VR4EHWE62"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics ONLY if valid Firebase API Key is configured to avoid 400 Invalid API Key background requests
export let analytics: any = null;
if (typeof window !== "undefined" && isFirebaseConfigured) {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        // Silently catch analytics init errors
      }
    }
  }).catch(() => {});
}

export {
  app,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
};


