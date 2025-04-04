import { booksDb } from '../config/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc } from 'firebase/firestore';

// Създаване на нова книга
export const createBook = async (bookData) => {
    try {
        const docRef = await addDoc(collection(booksDb, "books"), bookData);
        return docRef.id;
    } catch (error) {
        console.error("Error creating book: ", error);
        throw error;
    }
};

// Вземане на всички книги
export const getAllBooks = async () => {
    try {
        const querySnapshot = await getDocs(collection(booksDb, "books"));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting books: ", error);
        throw error;
    }
};

// Вземане на книга по ID
export const getBookById = async (bookId) => {
    try {
        const bookRef = doc(booksDb, "books", bookId);
        const bookDoc = await getDoc(bookRef);
        if (bookDoc.exists()) {
            return { id: bookDoc.id, ...bookDoc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error getting book: ", error);
        throw error;
    }
};

// Редактиране на книга
export const updateBook = async (bookId, bookData) => {
    try {
        const bookRef = doc(booksDb, "books", bookId);
        await updateDoc(bookRef, bookData);
    } catch (error) {
        console.error("Error updating book: ", error);
        throw error;
    }
};

// Изтриване на книга
export const deleteBook = async (bookId) => {
    try {
        await deleteDoc(doc(booksDb, "books", bookId));
    } catch (error) {
        console.error("Error deleting book: ", error);
        throw error;
    }
};

// Вземане на книги по потребител
export const getBooksByUser = async (userId) => {
    try {
        const q = query(collection(booksDb, "books"), where("ownerId", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting user books: ", error);
        throw error;
    }
}; 