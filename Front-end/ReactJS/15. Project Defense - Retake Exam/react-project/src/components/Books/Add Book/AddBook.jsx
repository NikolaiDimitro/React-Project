import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { useAsync } from '../../../hooks/useAsync';
import { BOOK_GENRES } from '../../../constants/genres';
import { bookValidationRules } from '../../../config/validationRules';
import { createBook } from '../../../services/bookService';
import Loading from '../../../components/common/Loading';
import './AddBook.css';

const AddBook = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { showToast } = useToast();

    const { formData, errors, handleChange, validateForm } = useFormValidation(
        {
            title: '',
            author: '',
            genre: BOOK_GENRES[0],
            year: new Date().getFullYear().toString(),
            description: '',
            imageUrl: ''
        },
        bookValidationRules
    );

    const { execute: createBookAsync, loading } = useAsync(createBook);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            showToast('Моля, влезте в профила си, за да създадете книга', 'error');
            return;
        }

        if (!validateForm()) {
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

            await createBookAsync(bookData);
            showToast('Книгата е създадена успешно!', 'success');
            navigate('/catalog');
        } catch (err) {
            showToast(err.message || 'Грешка при създаване на книгата', 'error');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="add-book">
            <h2>Добави нова книга</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Заглавие</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <span className="error">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="author">Автор</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    />
                    {errors.author && <span className="error">{errors.author}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Жанр</label>
                    <select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                    >
                        {BOOK_GENRES.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
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
                    />
                    {errors.year && <span className="error">{errors.year}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">URL на снимката</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                    {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Зареждане...' : 'Добави книга'}
                </button>
            </form>
        </div>
    );
};

export default AddBook; 