import { useState, useEffect } from 'react';
import { getAllBooks } from '../../services/bookService';
import './Home.css';

export const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                await getAllBooks();
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
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className="popular-books">
                <h2>Най-харесвани книги</h2>
                <div className="books-grid">
                    <div className="book-section">
                        <h3>Художествена литература</h3>
                        <div className="book-card">
                            <img src="/images/book1.jpg" alt="Книга 1" />
                            <h4>Заглавие на книга 1</h4>
                            <p>Автор: Име на автор</p>
                        </div>
                    </div>

                    <div className="book-section">
                        <h3>Научна фантастика</h3>
                        <div className="book-card">
                            <img src="/images/book2.jpg" alt="Книга 2" />
                            <h4>Заглавие на книга 2</h4>
                            <p>Автор: Име на автор</p>
                        </div>
                    </div>

                    <div className="book-section">
                        <h3>Биографии</h3>
                        <div className="book-card">
                            <img src="/images/book3.jpg" alt="Книга 3" />
                            <h4>Заглавие на книга 3</h4>
                            <p>Автор: Име на автор</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home; 