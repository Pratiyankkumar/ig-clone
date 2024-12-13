// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbdjUyk-SCoMsR0vm0GV2_tUM5704_fc4",
  authDomain: "instagram-clone-eb6dd.firebaseapp.com",
  projectId: "instagram-clone-eb6dd",
  storageBucket: "instagram-clone-eb6dd.firebasestorage.app",
  messagingSenderId: "115251788696",
  appId: "1:115251788696:web:5b3c92702f142159c549ed",
  measurementId: "G-MDBJXWDYLV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
