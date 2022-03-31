// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import "firebase/auth";
// 첫번째 임포트 import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4EyTNXFtdXZFa8-mMXZ8pDXv-SWv0usk",
  authDomain: "twitter-57e28.firebaseapp.com",
  projectId: "twitter-57e28",
  storageBucket: "twitter-57e28.appspot.com",
  messagingSenderId: "572126638042",
  appId: "1:572126638042:web:60b1f5ab65918172a21ae3",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig);
