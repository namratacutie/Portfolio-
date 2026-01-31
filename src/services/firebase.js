// Firebase configuration using environment variables
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Gracefully handle Realtime Database initialization
let rtdbInstance = null;
try {
    if (firebaseConfig.databaseURL) {
        rtdbInstance = getDatabase(app);
    } else {
        console.warn("Firebase Realtime Database URL not found in env variables.");
    }
} catch (e) {
    console.error("Failed to initialize Realtime Database:", e);
}

export const rtdb = rtdbInstance;
export { analytics };
export default app;