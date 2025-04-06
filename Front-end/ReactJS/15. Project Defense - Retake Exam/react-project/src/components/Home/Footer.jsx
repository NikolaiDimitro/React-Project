import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>За нас</h3>
                    <p>BookLibrary е платформа за споделяне и откриване на книги.</p>
                </div>
                
                <div className="footer-section">
                    <h3>Контакти</h3>
                    <p>Email: info@booklibrary.com</p>
                    <p>Телефон: +359 888 888 888</p>
                </div>
                
                <div className="footer-section">
                    <h3>Последвайте ни</h3>
                    <div className="social-links">
                        <a href="https://facebook.com" className="social-link">Facebook</a>
                        <a href="https://twitter.com" className="social-link">Twitter</a>
                        <a href="https://instagram.com" className="social-link">Instagram</a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2024 BookLibrary. Всички права запазени.</p>
            </div>
        </footer>
    );
}; 