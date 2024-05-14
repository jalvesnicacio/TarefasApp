// Your web app's Firebase configuration
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID
} from '@env'


var app;
var database;
var auth;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBoz_f6EJEL54NmQSW0LqPdqaOezuhvR6o",
//     authDomain: "tarefas-185ff.firebaseapp.com",
//     projectId: "tarefas-185ff",
//     storageBucket: "tarefas-185ff.appspot.com",
//     messagingSenderId: "1029636646584",
//     appId: "1:1029636646584:web:32a634dbb3ba14db30364d"
// };

// Inicialização do app Firebase
app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Inicialização dos serviços
database = getDatabase(app);
auth = getAuth(app);

export { app, auth, database };