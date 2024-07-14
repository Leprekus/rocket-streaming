import firebase from 'firebase/app'
import 'firebase/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyCneZDAQhMdenguHTYF6BwGpLxTCU4WW1g",
    authDomain: "rocket-streaming.firebaseapp.com",
    projectId: "rocket-streaming",
    storageBucket: "rocket-streaming.appspot.com",
    messagingSenderId: "67512126297",
    appId: "1:67512126297:web:316270c7cade1c53c15a48",
    measurementId: "G-R9T40F0GC9"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
  } else {
	firebase.app(); // if already initialized, use that one
  }
  
  const db = firebase.firestore();
  
  export { db };