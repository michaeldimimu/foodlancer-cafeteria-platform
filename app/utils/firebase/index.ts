"use client";

import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAAZwM-2tlA5YHnLisRbSV5En_QBc2d6_k",
  authDomain: "foodlancer-ae872.firebaseapp.com",
  projectId: "foodlancer-ae872",
  storageBucket: "foodlancer-ae872.firebasestorage.app",
  messagingSenderId: "123630284354",
  appId: "1:123630284354:web:92b60161bc7692ba2407db",
  measurementId: "G-THV2GWYCH1",
};

const firebaseapp = initializeApp(firebaseConfig);

export const messaging = () => getMessaging(firebaseapp);

export default firebaseapp;
