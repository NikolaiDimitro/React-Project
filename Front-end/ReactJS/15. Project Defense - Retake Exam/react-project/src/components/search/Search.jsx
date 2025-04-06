import { useState, useEffect } from 'react';
import { getAllBooks } from '../../services/bookService';
import './Search.css';

export const Search = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

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

    const categories = [...new Set(books.map(book => book.category))];

    const filteredBooks = books.filter(book => {
        const matchesSearch = 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
        
        return matchesSearch && matchesCategory;
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
                    <div className="category-filter">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Всички категории</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
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
        </div>
    );
};

export default Search; 