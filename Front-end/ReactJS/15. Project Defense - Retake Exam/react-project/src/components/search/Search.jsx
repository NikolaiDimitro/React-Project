import { useState, useEffect } from 'react';
import { getAllBooks } from '../../services/bookService';
import { BOOK_GENRES } from '../../constants/genres';
import BookCard from '../books/BookCard';
import './Search.css';

export const Search = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getAllBooks();
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book => {
        const matchesSearch = 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
        
        return matchesSearch && matchesGenre;
    });

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    return (
        <div className="search-container">
            <div className="search-header">
                <h1>Търсене на книги</h1>
                <div className="search-filters">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Търсене по заглавие, автор или описание..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="genre-filter">
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="">Всички жанрове</option>
                            {BOOK_GENRES.map(genre => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="search-results">
                <h2>Резултати: {filteredBooks.length} книги</h2>
                <div className="books-grid">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search; 