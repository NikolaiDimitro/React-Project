import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Конфигурация за потребителите
const usersConfig = {
    apiKey: "AIzaSyAdd8e7eHNCYkfUl-rWiGDfzpTc563Zlng",
    authDomain: "users-f369f.firebaseapp.com",
    databaseURL: "https://users-f369f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "users-f369f",
    storageBucket: "users-f369f.firebasestorage.app",
    messagingSenderId: "1033550246421",
    appId: "1:1033550246421:web:5817a8ed37a10c2f87541c"
};

// Конфигурация за книгите
const booksConfig = {
    apiKey: "AIzaSyCIG__k0l_eAf_56LRv3dyMabrPqI5p9pc",
    authDomain: "books-2cd6a.firebaseapp.com",
    projectId: "books-2cd6a",
    storageBucket: "books-2cd6a.firebasestorage.app",
    messagingSenderId: "112741710872",
    appId: "1:112741710872:web:ccf500d227a099e350976d"
};

// Инициализиране на приложенията
const usersApp = initializeApp(usersConfig, 'users');
const booksApp = initializeApp(booksConfig, 'books');

// Експорт на услугите
export const auth = getAuth(usersApp);
export const db = getFirestore(booksApp); 