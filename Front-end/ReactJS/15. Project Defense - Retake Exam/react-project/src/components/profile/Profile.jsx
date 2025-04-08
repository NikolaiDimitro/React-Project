import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getBooksByUser } from '../../Services/bookService';
import BookCard from '../Books/BooksCard/BookCard';
import ChangePassword from './ChangePassword';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { currentUser } = useAuth();
    const [userBooks, setUserBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const fetchUserBooks = async () => {
            try {
                const books = await getBooksByUser(currentUser.uid);
                setUserBooks(books);
            } catch (err) {
                setError('Грешка при зареждането на вашите книги');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBooks();
    }, [currentUser, navigate]);

    if (!currentUser) {
        return null;
    }

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Профил</h1>
                <div className="user-info">
                    <p><strong>Имейл:</strong> {currentUser.email}</p>
                    <p><strong>Добавени книги:</strong> {userBooks.length}</p>
                </div>
            </div>

            <div className="profile-sections">
                <div className="change-password-section">
                    <ChangePassword />
                </div>

                <div className="user-books">
                    <h2>Вашите книги</h2>
                    {error && <div className="error">{error}</div>}
                    {userBooks.length === 0 ? (
                        <p className="no-books">Все още нямате добавени книги</p>
                    ) : (
                        <div className="books-grid">
                            {userBooks.map(book => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile; 