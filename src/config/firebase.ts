// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:  process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:  process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  storageBucket: "gs://echo-deefa.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // My Firebase app

export const auth = getAuth(app); // For general authentication
export const provider = new GoogleAuthProvider(); //Auth for google
export const database = getFirestore(app); // Firestore database
export const storage = getStorage(app)
