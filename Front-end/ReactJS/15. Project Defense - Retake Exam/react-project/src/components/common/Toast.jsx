import { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`toast toast-${type}`}>
            <p>{message}</p>
            <button className="toast-close" onClick={() => {
                setIsVisible(false);
                onClose?.();
            }}>
                ✕
            </button>
        </div>
    );
};

export default Toast; 