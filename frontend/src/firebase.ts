import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCvH6MoJ8D58UQxOPPorLY5XJVcaPT_xQg",
  authDomain: "authproject-5d598.firebaseapp.com",
  projectId: "authproject-5d598",
  storageBucket: "authproject-5d598.firebasestorage.app",
  messagingSenderId: "255243003213",
  appId: "1:255243003213:web:c37b7360f2dc5095318304",
  measurementId: "G-29Z482S77T"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
