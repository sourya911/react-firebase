import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage" 


const firebaseConfig = {
  apiKey: "AIzaSyB5ljrPy4Nn4SLpKASNgHE9mG1Zk5I2i2o",
  authDomain: "fir-react-e260d.firebaseapp.com",
  projectId: "fir-react-e260d",
  storageBucket: "fir-react-e260d.appspot.com",
  messagingSenderId: "929351027665",
  appId: "1:929351027665:web:89881f75d5df0253edaef0",
  measurementId: "G-DKYC4MKTPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider= new GoogleAuthProvider(app)
export const db = getFirestore(app)

export const storage =getStorage(app)
// here we pass the app as parameter to function we just imported