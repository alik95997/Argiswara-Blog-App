// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { getFirestore, setDoc, doc, getDoc, deleteDoc, getDocs, collection, addDoc, query, where, updateDoc,limit } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdxYWfQ97sCiz-cRgzxBl8l2GrBrIR_w8",
    authDomain: "firsttry-536db.firebaseapp.com",
    projectId: "firsttry-536db",
    storageBucket: "firsttry-536db.firebasestorage.app",
    messagingSenderId: "931316456912",
    appId: "1:931316456912:web:35e7f3eb11b685fe52edd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, limit, getFirestore, deleteDoc, collection, setDoc, doc, db, updateDoc, getDocs, getDoc, addDoc, query, where, signOut }
