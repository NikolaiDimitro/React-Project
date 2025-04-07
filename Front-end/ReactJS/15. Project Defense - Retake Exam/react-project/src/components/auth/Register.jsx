import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // Валидация на имейл
        if (!formData.email) {
            errors.email = 'Имейлът е задължителен';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Моля, въведете валиден имейл адрес (пример: user@example.com)';
        } else if (formData.email.length > 100) {
            errors.email = 'Имейлът не може да бъде по-дълъг от 100 символа';
        }

        // Валидация на парола
        if (!formData.password) {
            errors.password = 'Паролата е задължителна';
        } else if (formData.password.length < 6) {
            errors.password = 'Паролата трябва да е поне 6 символа';
        } else if (formData.password.length > 50) {
            errors.password = 'Паролата не може да бъде по-дълга от 50 символа';
        }

        // Валидация на потвърждение на парола
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Потвърждението на паролата е задължително';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Паролите не съвпадат';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Изчистваме грешката за конкретното поле при промяна
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await register(formData.email, formData.password);
            navigate('/catalog');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Регистрация</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="email">Имейл</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={validationErrors.email ? 'error-input' : ''}
                    />
                    {validationErrors.email && (
                        <span className="field-error">{validationErrors.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Парола</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={validationErrors.password ? 'error-input' : ''}
                    />
                    {validationErrors.password && (
                        <span className="field-error">{validationErrors.password}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Потвърди парола</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={validationErrors.confirmPassword ? 'error-input' : ''}
                    />
                    {validationErrors.confirmPassword && (
                        <span className="field-error">{validationErrors.confirmPassword}</span>
                    )}
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? 'Регистрация...' : 'Регистрация'}
                    </button>
                </div>
            </form>
            <div className="login-link">
                Вече имате акаунт? <Link to="/login">Вход</Link>
            </div>
        </div>
    );
};

export default Register; 