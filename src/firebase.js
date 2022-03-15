import { initializeApp } from "firebase/app";

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

const app = initializeApp(firebaseConfig);
export default app