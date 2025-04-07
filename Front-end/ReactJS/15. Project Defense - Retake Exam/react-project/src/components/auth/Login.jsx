import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        } else if (formData.password.length > 50) {
            errors.password = 'Паролата не може да бъде по-дълга от 50 символа';
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
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setError('Невалиден имейл или парола. Моля, опитайте отново.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Вход</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
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

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Влизане...' : 'Вход'}
                    </button>
                </div>
            </form>
            <div className="register-link">
                Нямате акаунт? <Link to="/register">Регистрация</Link>
            </div>
        </div>
    );
};

export default Login; 