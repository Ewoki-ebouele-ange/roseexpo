import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import { initializeApp, getApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth} from 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyDH27fa4IFeYokECxKnfJAMMsgu75HHhKo",
    authDomain: "sparkdb-9bbc0.firebaseapp.com",
    projectId: "sparkdb-9bbc0",
    storageBucket: "sparkdb-9bbc0.appspot.com",
    messagingSenderId: "921939375095",
    appId: "1:921939375095:web:e82adec12240928103b4f2"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore();
export const storage = getStorage(app);

export default firebase;




