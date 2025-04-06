import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Конфигурация за удостоверяване (потребители)
const authConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Конфигурация за книги
const booksConfig = {
    apiKey: import.meta.env.VITE_BOOKS_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_BOOKS_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_BOOKS_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_BOOKS_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_BOOKS_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_BOOKS_FIREBASE_APP_ID
};

// Инициализиране на двете приложения
const authApp = initializeApp(authConfig, 'auth');
const booksApp = initializeApp(booksConfig, 'books');

// Експорт на съответните услуги
export const auth = getAuth(authApp);
export const db = getFirestore(booksApp); 