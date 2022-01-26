/* eslint-disable */
import { initializeApp } from 'firebase/app';
import { FieldValue, getFirestore, setDoc, doc, connectFirestoreEmulator} from 'firebase/firestore';
import 'firebase/firestore';
import { getAuth, signOut, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from 'firebase/auth';


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

console.log(config.apiKey);
const firebase = initializeApp(config);
const firestore = getFirestore();


export { firebase, firestore, FieldValue, setDoc, doc, signOut, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile };
