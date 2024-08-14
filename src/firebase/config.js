
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyA0eebhXOxr2CuJcjy_K9EnNjj3Py1-lG0",
    authDomain: "react-cursos-cb1ae.firebaseapp.com",
    projectId: "react-cursos-cb1ae",
    storageBucket: "react-cursos-cb1ae.appspot.com",
    messagingSenderId: "1077058652362",
    appId: "1:1077058652362:web:70eb2b8a10414b3f924c33"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp); 