// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ4oZEvT1r_Md0mgSsQNv6JF2OMbAuxkw",
  authDomain: "gym-system-f29ce.firebaseapp.com",
  projectId: "gym-system-f29ce",
  storageBucket: "gym-system-f29ce.appspot.com",
  messagingSenderId: "1072981819128",
  appId: "1:1072981819128:web:de6da594835e921d3ec50d",
  measurementId: "G-PK9SMH0ZQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);