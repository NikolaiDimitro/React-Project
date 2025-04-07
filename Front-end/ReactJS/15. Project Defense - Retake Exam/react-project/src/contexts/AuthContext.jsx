import { createContext, useContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('AuthProvider mounted');
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth state changed:', user);
            setCurrentUser(user);
            setLoading(false);
        });

        return () => {
            console.log('AuthProvider unmounted');
            unsubscribe();
        };
    }, []);

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error(getErrorMessage(error.code));
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error('Login error:', error);
            throw new Error(getErrorMessage(error.code));
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
            throw new Error('Грешка при изход. Моля, опитайте отново.');
        }
    };

    const changePassword = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword);
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'Този имейл вече е регистриран.';
            case 'auth/invalid-email':
                return 'Невалиден имейл адрес.';
            case 'auth/operation-not-allowed':
                return 'Регистрацията е временно спряна.';
            case 'auth/weak-password':
                return 'Паролата е твърде слаба. Моля, използвайте поне 6 символа.';
            case 'auth/user-not-found':
                return 'Потребител с този имейл не съществува.';
            case 'auth/wrong-password':
                return 'Грешна парола.';
            default:
                return 'Възникна грешка. Моля, опитайте отново.';
        }
    };

    const value = {
        currentUser,
        loading,
        register,
        login,
        logout,
        updatePassword: changePassword
    };

    console.log('AuthProvider rendering with currentUser:', currentUser);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 