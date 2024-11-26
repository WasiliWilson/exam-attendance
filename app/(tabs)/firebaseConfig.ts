import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrD0SjEmfb9-DN0I-zfXDvESfjXJeGfTg",
  authDomain: "exam-attendance-85382.firebaseapp.com",
  projectId: "exam-attendance-85382",
  storageBucket: "exam-attendance-85382.appspot.com",
  messagingSenderId: "805162388889",
  appId: "1:805162388889:web:2b1be3b7d3a86155c89708",
  measurementId: "G-JMD8P0H8HK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };