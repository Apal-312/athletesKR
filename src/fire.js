// Import the functions you need from the SDKs you need
import "firebase/compat/app";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvkYyC_5oFo8XLedmdWNviEPSnXMFU01g",
  authDomain: "athleteskr.firebaseapp.com",
  projectId: "athleteskr",
  storageBucket: "athleteskr.firebasestorage.app",
  messagingSenderId: "391242686743",
  appId: "1:391242686743:web:4f76512c20ff752f495752",
  measurementId: "G-42H4DX8WW8",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
