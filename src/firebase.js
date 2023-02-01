// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDydWbyzsl_jz20a2us900KLEc12kQWAFA",
  authDomain: "vb-report.firebaseapp.com",
  projectId: "vb-report",
  storageBucket: "vb-report.appspot.com",
  messagingSenderId: "1041553307960",
  appId: "1:1041553307960:web:ec491ed27a42619a4ae9cd",
  measurementId: "G-1RCQZS3PZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
