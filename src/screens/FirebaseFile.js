import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
 ////////////////////
 ////////////////////
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}
export const myAuth = firebase.auth();
export const db = getFirestore();
