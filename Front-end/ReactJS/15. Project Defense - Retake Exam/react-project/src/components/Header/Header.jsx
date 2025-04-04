import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/catalog" className="nav-link">Каталог</Link>
                <button 
                    className="nav-link search-btn"
                    onClick={() => window.location.href = '/search'}
                >
                    Търсене
                </button>
            </div>
            
            <div className="logo">
                <Link to="/">
                    <h1>BookLibrary</h1>
                </Link>
            </div>

            <div className="header-right">
                <Link to="/login" className="nav-link">Вход</Link>
                <Link to="/register" className="nav-link">Регистрация</Link>
            </div>
        </header>
    );
}; 