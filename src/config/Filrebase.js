import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";


const firebaseConfig = {

  };
// // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const my_auth = firebase.auth();
export const db = getFirestore(app);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
