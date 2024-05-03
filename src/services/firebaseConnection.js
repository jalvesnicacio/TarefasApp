// Your web app's Firebase configuration
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

var app;
var database;
var auth;

const firebaseConfig = {
    apiKey: "AIzaSyBoz_f6EJEL54NmQSW0LqPdqaOezuhvR6o",
    authDomain: "tarefas-185ff.firebaseapp.com",
    projectId: "tarefas-185ff",
    storageBucket: "tarefas-185ff.appspot.com",
    messagingSenderId: "1029636646584",
    appId: "1:1029636646584:web:32a634dbb3ba14db30364d"
};

// Inicialização do app Firebase
app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Inicialização dos serviços
database = getDatabase(app);
auth = getAuth(app);

export { app, auth, database };