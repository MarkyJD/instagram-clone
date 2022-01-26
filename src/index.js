import ReactDOM from 'react-dom';
import App from './App';
import 'react-loading-skeleton/dist/skeleton.css';
import FirebaseContext from './context/firebase';
import {
  // eslint-disable-next-line import/named
  FieldValue, firebase, firestore, getAuth, signInWithEmailAndPassword, updateProfile,
  onAuthStateChanged, signOut, setDoc, doc
} from './lib/firebase';
import './index.css';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <FirebaseContext.Provider value={{
    firebase,
    firestore,
    FieldValue,
    setDoc,
    doc,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
  }}
  >
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
