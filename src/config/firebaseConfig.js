import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA9A4gI87RbGsjejdOCd6BhHSem19hS-9A",
    authDomain: "emer1-29456.firebaseapp.com",
    databaseURL: "https://emer1-29456-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "emer1-29456",
    storageBucket: "emer1-29456.appspot.com",
    messagingSenderId: "254109520523",
    appId: "1:254109520523:web:633569113df4c95b187a8e"
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, getStorage };