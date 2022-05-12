// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1qDZLC6nBmU97ZODhyRsO8jfhatIPQFU",
  authDomain: "tech-geeks-auth-c3e4e.firebaseapp.com",
  projectId: "tech-geeks-auth-c3e4e",
  storageBucket: "tech-geeks-auth-c3e4e.appspot.com",
  messagingSenderId: "420767458000",
  appId: "1:420767458000:web:1a5b008e2abb5e469bf4d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
