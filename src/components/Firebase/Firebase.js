import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCP7IFwQD_s3RU_a65yQMCQ0Q-b9f3V9DU",
  authDomain: "subscriptionservice-f776d.firebaseapp.com",
  databaseURL: "https://subscriptionservice-f776d.firebaseio.com",
  projectId: "subscriptionservice-f776d",
  storageBucket: "subscriptionservice-f776d.appspot.com",
  messagingSenderId: "49659875159",
  appId: "1:49659875159:web:ec928f01cc6417c5"
});
const getUserName = () => {
  return firebase.auth().currentUser.displayName;
};
const getUserId = () => {
  return firebase.auth().currentUser.uid;
};
const FacebookProvider = new firebase.auth.FacebookAuthProvider();
const db = firebaseApp.firestore();
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export { db, FacebookProvider, GoogleProvider, getUserName, getUserId };
