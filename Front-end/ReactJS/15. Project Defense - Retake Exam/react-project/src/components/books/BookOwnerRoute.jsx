import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';

export const BookOwnerRoute = ({ children }) => {
    const { user } = useAuth();
    const { id } = useParams();
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkOwnership = async () => {
            try {
                const docRef = doc(db, 'books', id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists() && docSnap.data().ownerId === user?.uid) {
                    setIsOwner(true);
                }
            } catch (error) {
                console.error('Грешка при проверка на собственика:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user && id) {
            checkOwnership();
        } else {
            setLoading(false);
        }
    }, [user, id]);

    if (loading) {
        return <div>Зареждане...</div>;
    }

    if (!isOwner) {
        return <Navigate to="/catalog" />;
    }

    return children;
}; 