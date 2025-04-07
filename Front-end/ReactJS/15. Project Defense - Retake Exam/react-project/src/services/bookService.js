import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Създаване на нова книга
export const createBook = async (bookData) => {
    try {
        if (!bookData.ownerId) {
            throw new Error('Owner ID is required');
        }

        const bookRef = collection(db, 'books');
        const newBook = {
            ...bookData,
            createdAt: new Date().toISOString(), // Запазваме датата в ISO формат
            likes: 0,
            likedBy: []
        };

        const docRef = await addDoc(bookRef, newBook);
        return { id: docRef.id, ...newBook };
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

// Помощни функции за управление на харесаните книги
const getLikedBooks = () => {
    const likedBooks = localStorage.getItem('likedBooks');
    return likedBooks ? JSON.parse(likedBooks) : [];
};

const setLikedBooks = (likedBooks) => {
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
};

export const isBookLiked = async (bookId, userId) => {
    try {
        console.log('Checking if book is liked:', bookId, 'by user:', userId);
        if (!bookId || !userId) {
            console.log('Missing bookId or userId');
            return false;
        }

        const bookRef = doc(db, 'books', bookId);
        const bookDoc = await getDoc(bookRef);
        
        if (!bookDoc.exists()) {
            console.log('Book not found');
            return false;
        }

        const bookData = bookDoc.data();
        const isLiked = bookData.likedBy && bookData.likedBy.includes(userId);
        console.log('Book liked status:', isLiked);
        return isLiked;
    } catch (error) {
        console.error('Error checking if book is liked:', error);
        return false;
    }
};

export const toggleBookLike = async (bookId, userId) => {
    try {
        console.log('Toggling like for book:', bookId, 'by user:', userId);
        if (!bookId || !userId) {
            console.log('Missing bookId or userId');
            return false;
        }

        const bookRef = doc(db, 'books', bookId);
        const bookDoc = await getDoc(bookRef);
        
        if (!bookDoc.exists()) {
            console.log('Book not found');
            return false;
        }

        const bookData = bookDoc.data();
        const isLiked = bookData.likedBy && bookData.likedBy.includes(userId);

        if (isLiked) {
            console.log('Removing like');
            await updateDoc(bookRef, {
                likedBy: arrayRemove(userId),
                likes: (bookData.likes || 0) - 1
            });
        } else {
            console.log('Adding like');
            await updateDoc(bookRef, {
                likedBy: arrayUnion(userId),
                likes: (bookData.likes || 0) + 1
            });
        }

        return !isLiked;
    } catch (error) {
        console.error('Error toggling book like:', error);
        throw error;
    }
};

// Вземане на всички книги
export const getAllBooks = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'books'));
        const books = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        // Сортиране по дата на създаване (най-новите първи)
        return books.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Вземане на книга по ID
export const getBookById = async (id) => {
    try {
        const bookDoc = doc(db, 'books', id);
        const snapshot = await getDoc(bookDoc);
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
        console.error("Error getting book: ", error);
        throw error;
    }
};

// Редактиране на книга
export const updateBook = async (id, bookData) => {
    try {
        const bookRef = doc(db, 'books', id);
        await updateDoc(bookRef, bookData);
        return { id, ...bookData };
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

// Изтриване на книга
export const deleteBook = async (id) => {
    try {
        const bookRef = doc(db, 'books', id);
        await deleteDoc(bookRef);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

// Вземане на книги по потребител
export const getBooksByUser = async (userId) => {
    try {
        const booksRef = collection(db, 'books');
        const q = query(booksRef, where('ownerId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching user books:', error);
        throw error;
    }
};

export const updateBookLikes = async (bookId, userId) => {
    try {
        console.log('Updating likes for book:', bookId, 'by user:', userId);
        if (!bookId || !userId) {
            console.log('Missing bookId or userId');
            return { likes: 0, isLiked: false };
        }

        const bookRef = doc(db, 'books', bookId);
        const bookDoc = await getDoc(bookRef);
        
        if (!bookDoc.exists()) {
            console.log('Book not found');
            return { likes: 0, isLiked: false };
        }

        const bookData = bookDoc.data();
        const isLiked = bookData.likedBy && bookData.likedBy.includes(userId);
        
        console.log('Current likes:', bookData.likes || 0, 'isLiked:', isLiked);
        return {
            likes: bookData.likes || 0,
            isLiked
        };
    } catch (error) {
        console.error('Error updating book likes:', error);
        return { likes: 0, isLiked: false };
    }
};

export const isBookOwner = async (bookId, userId) => {
    try {
        const bookDoc = doc(db, 'books', bookId);
        const snapshot = await getDoc(bookDoc);
        return snapshot.exists() && snapshot.data().ownerId === userId;
    } catch (error) {
        console.error('Error checking book ownership:', error);
        throw error;
    }
}; 