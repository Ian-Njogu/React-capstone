// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBdCBBuuG-pVIfPgq8Q-jBfKr3jgtBkz0",
  authDomain: "fir-react-app-aa8c2.firebaseapp.com",
  projectId: "fir-react-app-aa8c2",
  storageBucket: "fir-react-app-aa8c2.firebasestorage.app",
  messagingSenderId: "683617965092",
  appId: "1:683617965092:web:84b9cbf701e15fa6b9b4b1",
  measurementId: "G-QTZ9PY4Q82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = getAuth(app)