// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCneZDAQhMdenguHTYF6BwGpLxTCU4WW1g",
    authDomain: "rocket-streaming.firebaseapp.com",
    projectId: "rocket-streaming",
    storageBucket: "rocket-streaming.appspot.com",
    messagingSenderId: "67512126297",
    appId: "1:67512126297:web:316270c7cade1c53c15a48",
    measurementId: "G-R9T40F0GC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);