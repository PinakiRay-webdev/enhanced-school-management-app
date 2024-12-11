// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAZm0gNiAyrCuctoSGxoiMNNgXXUp_3i5g",
  authDomain: "react-school-management-app.firebaseapp.com",
  projectId: "react-school-management-app",
  storageBucket: "react-school-management-app.firebasestorage.app",
  messagingSenderId: "346552954219",
  appId: "1:346552954219:web:f3fa894b60f590cdf1b02e",
  measurementId: "G-8KYH0DF964"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)