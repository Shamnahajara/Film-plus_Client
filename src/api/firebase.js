
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDRqbwgi3YFIVlFUrWNIyP52DXZIHfhR-g",
  authDomain: "film-plus-395708.firebaseapp.com",
  projectId: "film-plus-395708",
  storageBucket: "film-plus-395708.appspot.com",
  messagingSenderId: "1070072108029",
  appId: "1:1070072108029:web:091694ef63373d1f54ff94",
  measurementId: "G-DJ5568CYGB"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
