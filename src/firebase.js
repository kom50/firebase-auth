// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuVSXAWV5rNTZnfvF-svvPAQjIsl0ejAU",
    authDomain: "social-diary1.firebaseapp.com",
    databaseURL: "https://social-diary1-default-rtdb.firebaseio.com",
    projectId: "social-diary1",
    storageBucket: "social-diary1.appspot.com",
    messagingSenderId: "390302949303",
    appId: "1:390302949303:web:3b18acc669178880cbd232",
    measurementId: "G-ZJKC4X7GM6"
};

// Initialize Firebase
export default initializeApp(firebaseConfig);
