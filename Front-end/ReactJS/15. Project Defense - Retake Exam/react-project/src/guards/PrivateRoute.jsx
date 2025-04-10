import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/common/Loading';

const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute; 