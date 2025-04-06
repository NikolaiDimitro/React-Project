import { useState, useEffect } from 'react';
import { getAllBooks } from '../../services/bookService';
import './Catalog.css';

export const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

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

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase()) ||
        book.category.toLowerCase().includes(filter.toLowerCase())
    );

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    return (
        <div className="catalog-container">
            <div className="catalog-header">
                <h1>Каталог с книги</h1>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Търсене по заглавие, автор или категория..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="books-grid">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="book-card">
                        <div className="book-image">
                            <img src={book.imageUrl || "/images/book-placeholder.jpg"} alt={book.title} />
                        </div>
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p className="author">Автор: {book.author}</p>
                            <p className="category">Категория: {book.category}</p>
                            <p className="description">{book.description}</p>
                            <div className="book-stats">
                                <span className="likes">❤️ {book.likes || 0} харесвания</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog; 