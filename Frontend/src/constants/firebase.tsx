// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjqq4f0uNB0xb6RHuLnAvCPRFojCii8Bo",
  authDomain: "test-2c230.firebaseapp.com",
  //  databaseURL: "https://playground-43be4-default-rtdb.firebaseio.com",
  databaseURL: "https://test-2c230-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "test-2c230",
  storageBucket: "test-2c230.appspot.com",
  messagingSenderId: "648742662764",
  appId: "1:648742662764:web:5b4a550849fcdcf924de49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app)

export { auth, database }