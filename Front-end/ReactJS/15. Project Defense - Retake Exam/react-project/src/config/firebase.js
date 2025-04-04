import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Конфигурация за потребителите
const usersConfig = {
    apiKey: import.meta.env.VITE_USERS_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_USERS_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_USERS_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_USERS_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_USERS_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_USERS_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_USERS_FIREBASE_APP_ID
};

// Конфигурация за книгите
const booksConfig = {
    apiKey: import.meta.env.VITE_BOOKS_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_BOOKS_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_BOOKS_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_BOOKS_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_BOOKS_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_BOOKS_FIREBASE_APP_ID
};

// Инициализиране на Firebase приложения
const usersApp = initializeApp(usersConfig, 'users');
const booksApp = initializeApp(booksConfig, 'books');

// Инициализиране на Firestore бази
export const usersDb = getFirestore(usersApp);
export const booksDb = getFirestore(booksApp);

// Инициализиране на Authentication (използваме само една инстанция за автентикация)
export const auth = getAuth(usersApp); 