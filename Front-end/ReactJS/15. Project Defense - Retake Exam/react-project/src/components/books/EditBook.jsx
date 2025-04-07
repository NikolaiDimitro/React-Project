import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../../services/bookService';
import { BOOK_GENRES } from '../../constants/genres';
import './EditBook.css';

export default function EditBook() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: BOOK_GENRES[0],
        year: '',
        description: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await getBookById(id);
                if (book) {
                    setFormData({
                        title: book.title || '',
                        author: book.author || '',
                        genre: book.genre || BOOK_GENRES[0],
                        year: book.year || '',
                        description: book.description || '',
                        imageUrl: book.imageUrl || ''
                    });
                }
            } catch (err) {
                setError('Грешка при зареждането на книгата');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.title.trim()) {
            setError('Заглавието е задължително');
            setLoading(false);
            return;
        }

        if (!formData.author.trim()) {
            setError('Авторът е задължителен');
            setLoading(false);
            return;
        }

        if (/^\d+$/.test(formData.author.trim())) {
            setError('Името на автора не може да съдържа само цифри');
            setLoading(false);
            return;
        }

        try {
            await updateBook(id, formData);
            navigate(`/books/${id}`);
        } catch (error) {
            setError('Грешка при редактирането на книгата');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.title) {
        return <div className="loading">Зареждане...</div>;
    }

    return (
        <div className="edit-book-container">
            <h2>Редактиране на книга</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="edit-book-form">
                <div className="form-group">
                    <label htmlFor="title">Заглавие</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Автор</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Жанр</label>
                    <select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    >
                        {BOOK_GENRES.map(genre => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="year">Година</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">URL на снимка</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? 'Запазване...' : 'Запази промените'}
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => navigate(`/books/${id}`)}
                    >
                        Отказ
                    </button>
                </div>
            </form>
        </div>
    );
} 