import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
