import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import Loading from '../common/Loading';
import './ChangePassword.css';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser, updatePassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Проверка дали новата парола съвпада с текущата
        if (newPassword === currentPassword) {
            setError('Новата парола не може да бъде същата като текущата');
            setLoading(false);
            return;
        }

        // Проверка дали новите пароли съвпадат
        if (newPassword !== confirmPassword) {
            setError('Новите пароли не съвпадат');
            setLoading(false);
            return;
        }

        // Проверка за минимална дължина
        if (newPassword.length < 6) {
            setError('Паролата трябва да бъде поне 6 символа');
            setLoading(false);
            return;
        }

        try {
            // Създаване на credentials с текущата парола
            const credential = EmailAuthProvider.credential(
                currentUser.email,
                currentPassword
            );

            // Повторна автентикация на потребителя
            await reauthenticateWithCredential(currentUser, credential);

            // Промяна на паролата
            await updatePassword(newPassword);
            setSuccess('Паролата беше успешно променена');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
            if (error.code === 'auth/wrong-password') {
                setError('Грешна текуща парола');
            } else if (error.code === 'auth/requires-recent-login') {
                setError('Моля, влезте отново в профила си преди да промените паролата');
            } else {
                setError('Грешка при промяна на паролата. Моля, опитайте отново.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="change-password-container">
            <h2>Промяна на парола</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Текуща парола</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">Нова парола</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Потвърди новата парола</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="change-password-button"
                >
                    {loading ? 'Зареждане...' : 'Промени паролата'}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword; 