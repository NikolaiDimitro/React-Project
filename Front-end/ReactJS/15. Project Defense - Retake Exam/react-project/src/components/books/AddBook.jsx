import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createBook } from '../../services/bookService';
import './AddBook.css';

const BOOK_GENRES = [
    'Фантастика',
    'Фентъзи',
    'Роман',
    'Трилър',
    'Криминален',
    'Исторически',
    'Биографичен',
    'Научна литература',
    'Детска литература',
    'Поетика',
    'Драма',
    'Комедия',
    'Приключенски',
    'Хорър',
    'Мистерия',
    'Романтика',
    'Научна фантастика',
    'Уестърн',
    'Класика',
    'Съвременна литература'
];

const AddBook = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: BOOK_GENRES[0],
        year: new Date().getFullYear().toString(),
        description: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!currentUser) {
            setError('Моля, влезте в профила си, за да създадете книга');
            setLoading(false);
            return;
        }

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

        if (formData.author.trim().length < 2) {
            setError('Името на автора трябва да е поне 2 символа дълго');
            setLoading(false);
            return;
        }

        if (/^\d+$/.test(formData.author.trim())) {
            setError('Името на автора не може да съдържа само цифри');
            setLoading(false);
            return;
        }

        if (!formData.genre) {
            setError('Жанрът е задължителен');
            return;
        }

        if (!formData.year) {
            setError('Годината е задължителна');
            return;
        }

        if (isNaN(formData.year) || formData.year < 0) {
            setError('Годината трябва да е положително число');
            return;
        }

        if (formData.year > 2025) {
            setError('Годината не може да бъде по-голяма от 2025');
            return;
        }

        if (!formData.description.trim()) {
            setError('Описанието е задължително');
            return;
        }

        if (formData.description.trim().length < 10) {
            setError('Описанието трябва да е поне 10 символа дълго');
            return;
        }

        if (!formData.imageUrl.trim()) {
            setError('URL на снимката е задължителен');
            return;
        }

        if (!validateUrl(formData.imageUrl)) {
            setError('Моля, въведете валиден URL адрес');
            return;
        }

        try {
            const bookData = {
                ...formData,
                ownerId: currentUser.uid,
                ownerEmail: currentUser.email,
                likes: 0,
                createdAt: new Date().toISOString()
            };
            await createBook(bookData);
            navigate('/catalog');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="add-book">
            <h2>Добави нова книга</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="description">Описание (минимум 10 символа)</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        minLength="10"
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
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Създаване...' : 'Добави книга'}
                    </button>
                    <button type="button" onClick={() => navigate('/catalog')}>
                        Отказ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook; 