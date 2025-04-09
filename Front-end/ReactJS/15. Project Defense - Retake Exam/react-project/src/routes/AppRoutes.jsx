import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../guards/PrivateRoute';
import PublicRoute from '../guards/PublicRoute';
import Home from '../components/Home/Home';
import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import Catalog from '../components/Books/Catalog/Catalog';
import AddBook from '../components/books/Add Book/AddBook';
import BookDetails from '../components/Books/BookDetails/BookDetails';
import EditBook from '../components/books/editbook/EditBook';
import Profile from '../components/Profile/Profile';
import ChangePassword from '../components/Profile/ChangePassword';
import Search from '../components/Search/Search';
import NotFound from '../components/NotFound/NotFound';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
    const { logout } = useAuth();
    logout();
    return <Navigate to="/" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/search" element={<Search />} />
            
            <Route path="/books/:id" element={<BookDetails />} />
            
            <Route path="/login" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            
            <Route path="/register" element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            } />
            
            <Route path="/add-book" element={
                <PrivateRoute>
                    <AddBook />
                </PrivateRoute>
            } />
            
            <Route path="/books/:id/edit" element={
                <PrivateRoute>
                    <EditBook />
                </PrivateRoute>
            } />
            
            <Route path="/profile" element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            } />
            
            <Route path="/change-password" element={
                <PrivateRoute>
                    <ChangePassword />
                </PrivateRoute>
            } />

            <Route path="/logout" element={
                <PrivateRoute>
                    <Logout />
                </PrivateRoute>
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes; 