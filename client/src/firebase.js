// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e1838.firebaseapp.com",
  projectId: "mern-blog-e1838",
  storageBucket: "mern-blog-e1838.appspot.com",
  messagingSenderId: "342432672140",
  appId: "1:342432672140:web:8f9dccf7b07d469b674ea9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);