import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../../services/bookService';
import BookCard from './BookCard';
import './Catalog.css';

const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await getAllBooks();
                // Сортиране на книгите по дата на създаване в низходящ ред
                const sortedBooks = allBooks.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
                setBooks(sortedBooks);
            } catch (err) {
                setError('Грешка при зареждането на книгите');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Дата неизвестна';
        const date = new Date(timestamp);
        return date.toLocaleDateString('bg-BG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="catalog-container">
            <h1>Каталог</h1>
            {books.length === 0 ? (
                <p className="no-books">Все още няма добавени книги</p>
            ) : (
                <div className="books-grid">
                    {books.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Catalog; 