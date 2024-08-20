import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import {initializeAuth} from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB3h8Tw3wUktYxRgr8Y3aX7rXdb0IzxpTI",
    authDomain: "taskmaster-65c47.firebaseapp.com",
    projectId: "taskmaster-65c47",
    storageBucket: "taskmaster-65c47.appspot.com",
    messagingSenderId: "472829672058",
    appId: "1:472829672058:web:c4569af7009d7d71ef19c3",
    measurementId: "G-YP5NZ86WP3"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app);

export const auth = getAuth(app);
export const db = getFirestore(app);