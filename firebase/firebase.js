import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDo3huF1QR-UMogwsgxLrwQgq8ytwnKnBM",
    authDomain: "food-order-528d9.firebaseapp.com",
    projectId: "food-order-528d9",
    storageBucket: "food-order-528d9.appspot.com",
    messagingSenderId: "537649339063",
    appId: "1:537649339063:web:ee2b7256faed68cfd2cb32",
    measurementId: "G-JF3ZSEFB9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth, getStorage };



