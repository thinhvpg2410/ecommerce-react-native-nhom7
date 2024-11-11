// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJgRHLxJPi_eXa8sRPa48j6RIpgxvwERo",
  authDomain: "ecommerce-1d0da.firebaseapp.com",
  databaseURL: "https://ecommerce-1d0da-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecommerce-1d0da",
  storageBucket: "ecommerce-1d0da.firebasestorage.app",
  messagingSenderId: "601052517538",
  appId: "1:601052517538:web:5d7192548c80854267b3fb",
  measurementId: "G-BF5QXG53JM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);