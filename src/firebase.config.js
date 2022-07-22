import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqGvbOMN5lnMlr-9cXVH9FC2Tt4iHioLY",
  authDomain: "house-marketplace-app-48664.firebaseapp.com",
  projectId: "house-marketplace-app-48664",
  storageBucket: "house-marketplace-app-48664.appspot.com",
  messagingSenderId: "299385577597",
  appId: "1:299385577597:web:1665c87894865797d21114"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();