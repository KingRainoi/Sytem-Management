// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNl6HEBnQMnbo0iMZnQ08UZDCsssUW200",
  authDomain: "system-management-ae3cf.firebaseapp.com",
  projectId: "system-management-ae3cf",
  storageBucket: "system-management-ae3cf.appspot.com",
  messagingSenderId: "434592280143",
  appId: "1:434592280143:web:e532ba5c4bcc936763043a",
  measurementId: "G-MJ1Z971LMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);