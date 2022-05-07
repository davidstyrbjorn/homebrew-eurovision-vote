// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqnfcny3-P2VdO8BzayhLYg6QtKrconCM",
  authDomain: "homebrew-eurovision-vote.firebaseapp.com",
  projectId: "homebrew-eurovision-vote",
  storageBucket: "homebrew-eurovision-vote.appspot.com",
  messagingSenderId: "191224279618",
  appId: "1:191224279618:web:1d4bc4fc3eab64edfbf3db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the different services for our app
const db = getFirestore(app); // Storage of questions + answers from users
const auth = getAuth(app); // Anonmyous sign-in

export {db, auth};