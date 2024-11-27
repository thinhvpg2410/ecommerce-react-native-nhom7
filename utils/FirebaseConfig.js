import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, child } from 'firebase/database'; 
import { getFirestore } from 'firebase/firestore';
import {FIREBASE_API_KEY} from '@env';


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "ecommerce-1d0da.firebaseapp.com",
  databaseURL: "https://ecommerce-1d0da-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecommerce-1d0da",
  storageBucket: "ecommerce-1d0da.firebasestorage.app",
  messagingSenderId: "601052517538",
  appId: "1:601052517538:web:5d7192548c80854267b3fb",
  measurementId: "G-BF5QXG53JM"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const db = getFirestore(firebaseApp);
export default firebaseApp