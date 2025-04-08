import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
    return (
        <div className="book-card">
            <Link to={`/books/${book.id}`} className="book-link">
                <div className="book-image-container">
                    <img 
                        src={book.imageUrl || 'https://via.placeholder.com/200x300?text=No+Image'} 
                        alt={book.title} 
                        className="book-image"
                    />
                </div>
                <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <p className="book-genre">{book.genre}</p>
                    <Link to={`/books/${book.id}`} className="details-button">
                        Детайли
                    </Link>
                </div>
            </Link>
        </div>
    );
};

export default BookCard; 