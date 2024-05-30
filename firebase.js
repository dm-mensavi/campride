import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcJG54k0cRu_OwvoS3rN3uI5_swgRKCF0",
  authDomain: "shuttle-6d778.firebaseapp.com",
  projectId: "shuttle-6d778",
  storageBucket: "shuttle-6d778.appspot.com",
  messagingSenderId: "545275068216",
  appId: "1:545275068216:web:8396b8892f6a915b868bcd",
  measurementId: "G-2D5MCTP1P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider()
const auth = getAuth()
const db = getFirestore(app)

export { app, provider, auth, analytics, db}
