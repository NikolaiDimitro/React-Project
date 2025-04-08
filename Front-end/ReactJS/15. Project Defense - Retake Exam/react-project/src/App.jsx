import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Catalog from './components/books/Catalog';
import AddBook from './components/books/AddBook';
import BookDetails from './components/books/BookDetails';
import EditBook from './components/books/EditBook';
import Profile from './components/profile/Profile';
import ChangePassword from './components/profile/ChangePassword';
import Search from './components/search/Search';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ToastProvider>
                    <Navigation />
                    <main>
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
                        </Routes>
                    </main>
                </ToastProvider>
            </AuthProvider>
        </Router>
    );
}

export default App; 