import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import Home from './pages/Home/Home';
import './App.css';

const Layout = () => {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="catalog" element={<div>Каталог</div>} />
                    <Route path="search" element={<div>Страница за търсене</div>} />
                    <Route path="login" element={<div>Вход</div>} />
                    <Route path="register" element={<div>Регистрация</div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App; 