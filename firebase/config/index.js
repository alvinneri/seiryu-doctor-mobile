import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAO6lv7yplaW4vFKgHodFYNoy25yfNN5dk",
  authDomain: "seiryu-doctor-s-app.firebaseapp.com",
  projectId: "seiryu-doctor-s-app",
  storageBucket: "seiryu-doctor-s-app.appspot.com",
  messagingSenderId: "202770630356",
  appId: "1:202770630356:web:a599e015df8acf0cf51d41",
  measurementId: "G-1Y4NWNSTZS",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
export default firebase;
