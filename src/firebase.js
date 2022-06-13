import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react'; 
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAhriyS3WoTBz9-OAOsNz3aNFsGI-674Kc",
    authDomain: "cook-what-2b10c.firebaseapp.com",
    projectId: "cook-what-2b10c",
    storageBucket: "cook-what-2b10c.appspot.com",
    messagingSenderId: "480366828315",
    appId: "1:480366828315:web:9c07b75319fbcf3290d1be"
};

const app = initializeApp(config);
const auth = getAuth(app);

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;
}

export function logOut() {
    signOut(auth);
}

export const db = getFirestore(app);