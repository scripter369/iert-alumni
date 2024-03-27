// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwNkPoy5FFijoOnaUKqQNFT0IwokyLExs",
  authDomain: "alumni-1233e.firebaseapp.com",
  projectId: "alumni-1233e",
  storageBucket: "alumni-1233e.appspot.com",
  messagingSenderId: "977374300736",
  appId: "1:977374300736:web:0cd1b66ed6822af65eeda5",
  measurementId: "G-1BJRV2ZK5P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
