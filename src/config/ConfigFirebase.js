// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDsE0dk19zJVOnLTLIMuH4hjHNfUOyzYQ0",
  authDomain: "test-ecom-31a82.firebaseapp.com",
  projectId: "test-ecom-31a82",
  storageBucket: "test-ecom-31a82.appspot.com",
  messagingSenderId: "992478285514",
  appId: "1:992478285514:web:f162ad6bb0dcf2dea6ee33",
  measurementId: "G-679LWX8WX4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
export {analytics,auth,firestore}
