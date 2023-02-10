// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDShQJ7HzXIMLADWUoGT8CUX8eUPhE3RXc",
  authDomain: "sistema-gimnasio-84687.firebaseapp.com",
  projectId: "sistema-gimnasio-84687",
  storageBucket: "sistema-gimnasio-84687.appspot.com",
  messagingSenderId: "108037108755",
  appId: "1:108037108755:web:bf16e2801f9490da8cfbe6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);