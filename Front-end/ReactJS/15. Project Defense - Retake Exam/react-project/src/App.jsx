import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AddBook from './components/books/AddBook';
import BookDetails from './components/books/BookDetails';
import EditBook from './components/books/EditBook';
import Search from './components/search/Search';
import Catalog from './components/catalog/Catalog';
import Profile from './components/profile/Profile';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app">
                    <Navigation />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/add-book" element={<AddBook />} />
                            <Route path="/books/:id" element={<BookDetails />} />
                            <Route path="/books/:id/edit" element={<EditBook />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App; 