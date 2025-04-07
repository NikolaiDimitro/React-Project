import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getBookById, isBookLiked, toggleBookLike, updateBookLikes, deleteBook } from '../../services/bookService';
import './BookDetails.css';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookData = await getBookById(id);
                if (bookData) {
                    setBook(bookData);
                    if (currentUser) {
                        const liked = await isBookLiked(id, currentUser.uid);
                        setIsLiked(liked);
                        const { likes: bookLikes } = await updateBookLikes(id, currentUser.uid);
                        setLikes(bookLikes);
                        setIsOwner(currentUser.uid === bookData.ownerId);
                    }
                } else {
                    setError('Книгата не беше намерена');
                }
            } catch (err) {
                setError('Грешка при зареждането на книгата');
                console.error('Error fetching book:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, currentUser]);

    const handleLike = async () => {
        if (!currentUser || !currentUser.uid) {
            if (window.confirm('Моля, влезте в профила си, за да харесате книга. Искате ли да бъдете пренасочени към страницата за вход?')) {
                navigate('/login');
            }
            return;
        }

        if (isOwner) {
            alert('Не можете да харесате собствената си книга');
            return;
        }

        try {
            const newLikeStatus = await toggleBookLike(id, currentUser.uid);
            setIsLiked(newLikeStatus);
            setLikes(prev => newLikeStatus ? prev + 1 : prev - 1);
        } catch (error) {
            console.error('Error toggling like:', error);
            alert('Възникна грешка при харесването на книгата. Моля, опитайте отново.');
        }
    };

    const handleDelete = async () => {
        if (!currentUser || currentUser.uid !== book.ownerId) {
            alert('Нямате права да изтриете тази книга');
            return;
        }

        if (window.confirm('Сигурни ли сте, че искате да изтриете тази книга?')) {
            try {
                await deleteBook(id);
                navigate('/catalog');
            } catch (error) {
                console.error('Error deleting book:', error);
                alert('Възникна грешка при изтриването на книгата');
            }
        }
    };

    if (loading) {
        return <div className="loading">Зареждане...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!book) {
        return <div className="not-found">Книгата не беше намерена</div>;
    }

    return (
        <div className="book-details">
            <div className="book-header">
                <h1>{book.title}</h1>
                <div className="book-actions">
                    {!isOwner && (
                        <button 
                            className={`like-button ${isLiked ? 'liked' : ''}`}
                            onClick={handleLike}
                        >
                            {isLiked ? '❤️' : '🤍'} {likes}
                        </button>
                    )}
                    {currentUser && currentUser.uid === book.ownerId && (
                        <>
                            <button 
                                className="edit-button"
                                onClick={() => navigate(`/books/${id}/edit`)}
                            >
                                Редактирай
                            </button>
                            <button 
                                className="delete-button"
                                onClick={handleDelete}
                            >
                                Изтрий
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="book-content">
                <img src={book.imageUrl} alt={book.title} className="book-image" />
                <div className="book-info">
                    <p><strong>Автор:</strong> {book.author}</p>
                    <p><strong>Жанр:</strong> {book.genre}</p>
                    <p><strong>Година:</strong> {book.year}</p>
                    <p><strong>Описание:</strong> {book.description}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails; 