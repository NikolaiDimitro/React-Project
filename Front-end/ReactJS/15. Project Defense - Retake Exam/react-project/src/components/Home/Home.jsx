import { useState, useEffect } from 'react';
import { getAllBooks } from '../../services/bookService';
import './Home.css';

export const Home = () => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await getAllBooks();
                // Ако няма книги, използваме тестови данни
                if (fetchedBooks.length === 0) {
                    setBooks([
                        {
                            id: '1',
                            title: 'Война и мир',
                            author: 'Лев Толстой',
                            category: 'Художествена литература',
                            description: 'Класически роман, описващ живота на руското общество по време на Наполеоновите войни.',
                            likes: 150,
                            imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                        },
                        {
                            id: '2',
                            title: '1984',
                            author: 'Джордж Оруел',
                            category: 'Научна фантастика',
                            description: 'Дистопичен роман, описващ тоталитарно общество, в което правителството контролира всеки аспект от живота на хората.',
                            likes: 120,
                            imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                        },
                        {
                            id: '3',
                            title: 'Стив Джобс',
                            author: 'Уолтър Айзъксън',
                            category: 'Биографии',
                            description: 'Биография на един от най-влиятелните предприемачи в света на технологиите.',
                            likes: 100,
                            imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                        }
                    ]);
                } else {
                    setBooks(fetchedBooks.sort((a, b) => (b.likes || 0) - (a.likes || 0)));
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    return (
        <div className="home-container">
            <div className="welcome-section">
                <h1>Добре дошли в BookLibrary</h1>
                <div className="video-container">
                    <iframe 
                        width="100%" 
                        height="400" 
                        src="https://www.youtube.com/embed/2HwhOuHjMk4" 
                        title="YouTube video player" 
                        border="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className="popular-books">
                <h2>Най-харесвани книги</h2>
                
                {books.slice(0, 3).map((book, index) => (
                    <div key={book.id} className="popular-book-section">
                        <div className="popular-book-rank">
                            <span className="rank-number">{index + 1}</span>
                            <span className="rank-label">място</span>
                        </div>
                        <div className="popular-book-content">
                            <div className="popular-book-image">
                                <img src={book.imageUrl} alt={book.title} />
                            </div>
                            <div className="popular-book-info">
                                <h3>{book.title}</h3>
                                <p className="author">Автор: {book.author}</p>
                                <p className="category">Категория: {book.category}</p>
                                <p className="description">{book.description}</p>
                                <div className="book-stats">
                                    <span className="likes">❤️ {book.likes} харесвания</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home; 