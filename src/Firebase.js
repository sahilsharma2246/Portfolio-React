import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

  
const firebaseConfig = {
  apiKey: process.env.REACT_APP_A,
  authDomain: process.env.REACT_APP_B,
  databaseURL: process.env.REACT_APP_C,
  projectId: process.env.REACT_APP_D,
  storageBucket: process.env.REACT_APP_E,
  messagingSenderId: process.env.REACT_APP_F,
  appId: process.env.REACT_APP_G
};



const Connect = firebase.initializeApp(firebaseConfig);
export default Connect.database().ref();
