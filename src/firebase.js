import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3ch7WYOqoB1y3GdgHKKg5qOgRg-h-Wm8",
    authDomain: "whatsapp-bro-4c22d.firebaseapp.com",
    projectId: "whatsapp-bro-4c22d",
    storageBucket: "whatsapp-bro-4c22d.appspot.com",
    messagingSenderId: "93560196598",
    appId: "1:93560196598:web:036273dc31b9fd3b340bd7",
    measurementId: "G-EFSPQ838Y1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;