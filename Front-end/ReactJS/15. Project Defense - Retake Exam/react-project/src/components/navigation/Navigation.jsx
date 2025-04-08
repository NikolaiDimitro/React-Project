import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-left">
                    <Link to="/catalog" className="nav-link">Каталог</Link>
                    <Link to="/search" className="nav-link">Търсене</Link>
                    {currentUser && (
                        <Link to="/add-book" className="nav-link">Добави книга</Link>
                    )}
                </div>

                <div className="nav-center">
                    <Link to="/" className="nav-brand">BookLibrary</Link>
                </div>

                <div className="nav-right">
                    {currentUser ? (
                        <>
                            <span className="user-email">{currentUser.email}</span>
                            <Link to="/profile" className="nav-link">Профил</Link>
                            <button onClick={handleLogout} className="nav-button">Изход</button>
                        </>
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