import { useState, useEffect } from 'react';
import { getAllBooks } from '../../services/bookService';
import BookCard from '../books/BookCard';
import './Catalog.css';

export default function Catalog() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getAllBooks();
                setBooks(booksData);
            } catch (err) {
                setError('Грешка при зареждането на книгите');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="catalog-container">
            <h1>Каталог с книги</h1>
            <div className="books-grid">
                {books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
} 