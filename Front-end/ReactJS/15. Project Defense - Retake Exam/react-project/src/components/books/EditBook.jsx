import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import './EditBook.css';

export const EditBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        imageUrl: '',
        price: '',
        genre: ''
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const docRef = doc(db, 'books', id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                } else {
                    console.log('Книгата не беше намерена!');
                    navigate('/catalog');
                }
            } catch (error) {
                console.error('Грешка при зареждане на книгата:', error);
            }
        };

        fetchBook();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'books', id);
            await updateDoc(docRef, formData);
            console.log('Книгата беше обновена успешно!');
            navigate('/catalog');
        } catch (error) {
            console.error('Грешка при обновяване на книгата:', error);
        }
    };

    return (
        <div className="edit-book-container">
            <h2>Редактиране на книга</h2>
            <form onSubmit={handleSubmit} className="edit-book-form">
                <div className="form-group">
                    <label htmlFor="title">Заглавие:</label>
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
                    <label htmlFor="author">Автор:</label>
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
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">URL на снимката:</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Цена:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Жанр:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">Запази промените</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate('/catalog')}>Отказ</button>
                </div>
            </form>
        </div>
    );
};

export default EditBook; 