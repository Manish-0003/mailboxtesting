import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKfWiXEXX0Zox7OIWgeKMp2w0fyQGOVFo",
  authDomain: "mailbox-79e60.firebaseapp.com",
  databaseURL: "https://mailbox-79e60-default-rtdb.firebaseio.com",
  projectId: "mailbox-79e60",
  storageBucket: "mailbox-79e60.appspot.com",
  messagingSenderId: "899037815790",
  appId: "1:899037815790:web:41836d9afce832b14224ff"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };