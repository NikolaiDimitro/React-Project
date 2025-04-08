import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Страницата не беше намерена</h2>
            <p>Изглежда, че страницата, която търсите, не съществува или е преместена.</p>
            <Link to="/" className="home-link">
                Върни се в началото
            </Link>
        </div>
    );
};

export default NotFound; 