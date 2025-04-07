import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { createBook } from '../../services/bookService';
import './CreateBook.css';

const CreateBook = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        year: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            setError('Моля, влезте в профила си, за да създадете книга');
            return;
        }

        // Валидация на формата
        if (!formData.title || !formData.author || !formData.genre || !formData.year || !formData.description) {
            setError('Моля, попълнете всички полета');
            return;
        }

        // Валидация на годината
        const currentYear = new Date().getFullYear();
        const year = parseInt(formData.year);
        if (isNaN(year) || year < 0 || year > currentYear) {
            setError('Моля, въведете валидна година');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const bookData = {
                ...formData,
                year: parseInt(formData.year),
                ownerId: currentUser.uid,
                ownerEmail: currentUser.email,
                likes: 0,
                createdAt: new Date().toISOString()
            };

            await createBook(bookData);
            navigate('/catalog');
        } catch (err) {
            console.error('Error creating book:', err);
            setError('Възникна грешка при създаването на книгата. Моля, опитайте отново.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-book">
            <h2>Създай нова книга</h2>
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
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Година</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        min="0"
                        max={new Date().getFullYear()}
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Създаване...' : 'Създай книга'}
                    </button>
                    <button type="button" onClick={() => navigate('/catalog')}>
                        Отказ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBook; 