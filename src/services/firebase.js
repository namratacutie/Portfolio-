// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { firestore, getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATVcW6_fzSLxbzUswmJMm0DqJ4dq-fgAU",
    authDomain: "portfolio-a20d2.firebaseapp.com",
    projectId: "portfolio-a20d2",
    storageBucket: "portfolio-a20d2.firebasestorage.app",
    messagingSenderId: "1046776271760",
    appId: "1:1046776271760:web:5ffa41e5e755264d0d1915",
    measurementId: "G-K66DDRG7X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export default app;