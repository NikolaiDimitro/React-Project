import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Navigation from './components/navigation/Navigation';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ToastProvider>
                    <Navigation />
                    <main>
                        <AppRoutes />
                    </main>
                </ToastProvider>
            </AuthProvider>
        </Router>
    );
}

export default App; 