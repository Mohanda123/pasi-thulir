import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJLsme71QwYeZoVQs6UEJ7W0GRZermsxo",
  authDomain: "pasithulir-0105.firebaseapp.com",
  projectId: "pasithulir-0105",
  storageBucket: "pasithulir-0105.firebasestorage.app",
  messagingSenderId: "434976504146",
  appId: "1:434976504146:web:1dcb58fa6fd31e9f3d628b",
  measurementId: "G-DGBMG0RHBV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
