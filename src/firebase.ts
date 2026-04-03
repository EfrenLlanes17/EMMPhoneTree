// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBeByGo_HYLmS5_WGmhk9wgWwkblgDwdbI",
  authDomain: "emmphonetree.firebaseapp.com",
  projectId: "emmphonetree",
  storageBucket: "emmphonetree.firebasestorage.app",
  messagingSenderId: "287372125038",
  appId: "1:287372125038:web:fa150dc3b36798db8b577f"
};

export const app = initializeApp(firebaseConfig);