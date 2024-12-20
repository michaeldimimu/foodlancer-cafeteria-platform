"use client";

import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBTAcMkbsVJzZh4dNeL-U9k7pLWk5qAQ0Q",
  authDomain: "fcm-tutorial-2b4ce.firebaseapp.com",
  projectId: "fcm-tutorial-2b4ce",
  storageBucket: "fcm-tutorial-2b4ce.firebasestorage.app",
  messagingSenderId: "1003331905837",
  appId: "1:1003331905837:web:60f8b6ddb2ed32af734ba4",
  measurementId: "G-77Z8HEQ6GM",
};

const firebaseapp = initializeApp(firebaseConfig);

export const messaging = () => getMessaging(firebaseapp);

export default firebaseapp;
