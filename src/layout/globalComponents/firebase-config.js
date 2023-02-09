import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWYkWXwwU3TsBvT-_iXYFtW-Pm-43Klt8",
  authDomain: "agronomics-8aeee.firebaseapp.com",
  projectId: "agronomics-8aeee",
  storageBucket: "agronomics-8aeee.appspot.com",
  messagingSenderId: "288270224905",
  appId: "1:288270224905:web:60e0c0b2fc9f8e152032d8",
  measurementId: "G-7JPYB4KRMT"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);