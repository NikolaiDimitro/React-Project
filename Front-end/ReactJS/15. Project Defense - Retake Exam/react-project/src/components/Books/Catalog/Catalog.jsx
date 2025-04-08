import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../../../Services/bookService';
import BookCard from '../BooksCard/BookCard';
import './Catalog.css';

const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getAllBooks();
                // Сортираме книгите по дата на създаване в низходящ ред (най-новите първи)
                const sortedBooks = data.sort((a, b) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return dateB - dateA;
                });
                setBooks(sortedBooks);
            } catch (err) {
                console.error('Error fetching books:', err);
                setError('Грешка при зареждането на книгите');
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