// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNrjhKgV3PczmYIgOlUqm334YgqsJzawo",
  authDomain: "mrcoffee-61d1d.firebaseapp.com",
  projectId: "mrcoffee-61d1d",
  storageBucket: "mrcoffee-61d1d.firebasestorage.app",
  messagingSenderId: "1004878923759",
  appId: "1:1004878923759:web:46d26de8e340e05263981a",
  measurementId: "G-HZWMDPWQPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);