// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "camera-store-cce92.firebaseapp.com",
    projectId: "camera-store-cce92",
    storageBucket: "camera-store-cce92.appspot.com",
    messagingSenderId: "114872812865",
    appId: "1:114872812865:web:65841b151c8523caa94dc0",
    measurementId: "G-77VMGE77GX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
