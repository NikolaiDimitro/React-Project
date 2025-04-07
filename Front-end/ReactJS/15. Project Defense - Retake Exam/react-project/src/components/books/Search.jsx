import { useState, useEffect } from 'react';
import { getAllBooks } from '../../services/bookService';
import BookCard from './BookCard';
import { BOOK_GENRES } from '../../constants/genres';
import './Search.css';

const Search = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await getAllBooks();
                setBooks(allBooks);
            } catch (err) {
                setError('Грешка при зареждането на книгите');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book => {
        // Проверка за жанр
        if (selectedGenre && book.genre !== selectedGenre) {
            return false;
        }

        // Проверка за търсене
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                book.title.toLowerCase().includes(searchLower) ||
                book.author.toLowerCase().includes(searchLower) ||
                book.description.toLowerCase().includes(searchLower)
            );
        }

        return true;
    });

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="search-container">
            <h1>Търсене</h1>
            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Търсене по заглавие, автор или описание..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="genre-select"
                >
                    <option value="">Всички жанрове</option>
                    {BOOK_GENRES.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>

            <div className="search-results">
                {filteredBooks.length === 0 ? (
                    <p className="no-results">Няма намерени книги</p>
                ) : (
                    <div className="books-grid">
                        {filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search; 