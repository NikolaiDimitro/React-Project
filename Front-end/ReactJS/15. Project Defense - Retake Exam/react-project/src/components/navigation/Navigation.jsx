import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navigation.css';

export const Navigation = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Грешка при изход:', error);
        }
    };

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-links">
                    <Link to="/" className="nav-link">Начало</Link>
                    <Link to="/catalog" className="nav-link">Каталог</Link>
                    <Link to="/search" className="nav-link">Търсене</Link>
                    {user && (
                        <Link to="/books/add" className="nav-link">Добави книга</Link>
                    )}
                </div>
                
                <Link to="/" className="nav-logo">
                    <span>BookLibrary</span>
                </Link>

                <div className="nav-auth">
                    {user ? (
                        <div className="user-info">
                            <span className="user-email">{user.email}</span>
                            <button className="logout-btn" onClick={handleLogout}>
                                Изход
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Вход</Link>
                            <Link to="/register" className="nav-link">Регистрация</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 