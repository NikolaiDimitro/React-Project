import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'    

const PublicRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PublicRoute; 