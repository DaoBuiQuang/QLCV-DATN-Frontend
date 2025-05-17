// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDhlu763Buze3CR8PhhZXnDqi0u0zWDEno",
  authDomain: "fir-notification-sample-1cfeb.firebaseapp.com",
  projectId: "fir-notification-sample-1cfeb",
  storageBucket: "fir-notification-sample-1cfeb.firebasestorage.app",
  messagingSenderId: "696843593060",
  appId: "1:696843593060:web:fb70303bb7c02098d14671",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };
