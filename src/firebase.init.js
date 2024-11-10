// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgjThl5AHt2p3jUD91ilG_naDdaT53b6U",
  authDomain: "email-password-authentic-9a36b.firebaseapp.com",
  projectId: "email-password-authentic-9a36b",
  storageBucket: "email-password-authentic-9a36b.firebasestorage.app",
  messagingSenderId: "13248230941",
  appId: "1:13248230941:web:fdfcfb70ca353684d338f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
