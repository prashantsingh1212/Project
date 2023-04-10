// import firebase from 'firebase';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import firebase from 'firebase/compat/app';
import firebase from 'firebase/compat/app';
// import firebase from 'firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// import { getFirestore } from 'firebase/firestore/lite';

  
const firebaseConfig = {
    apiKey: "AIzaSyCqGxfpvyGb3jKu7mGzQyfa2AhERVq17lQ",
    authDomain: "movie-library-b028d.firebaseapp.com",
    databaseURL: "https://movie-library-b028d-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "movie-library-b028d",
    storageBucket: "movie-library-b028d.appspot.com",
    messagingSenderId: "222797959865",
    appId: "1:222797959865:web:81b6bddbb4b986c3410168"
  };
  const fire =firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
export const database = getDatabase(fire);
  export default fire;





