import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { Home } from './components/Home/Home';
import { Catalog } from './components/catalog/Catalog';
import { Search } from './components/search/Search';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { AddBook } from './components/books/AddBook';
import { EditBook } from './components/books/EditBook';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { BookOwnerRoute } from './components/books/BookOwnerRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route path="/books/add" element={
                        <ProtectedRoute>
                            <AddBook />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/books/edit/:id" element={
                        <ProtectedRoute>
                            <BookOwnerRoute>
                                <EditBook />
                            </BookOwnerRoute>
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App; 