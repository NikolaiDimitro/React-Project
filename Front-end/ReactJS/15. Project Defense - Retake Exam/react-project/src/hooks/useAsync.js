import { useState, useCallback } from 'react';

export const useAsync = (asyncFunction) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const execute = useCallback(async (...args) => {
        try {
            setLoading(true);
            setError(null);
            const result = await asyncFunction(...args);
            setData(result);
            return result;
        } catch (err) {
            setError(err.message || 'Възникна грешка');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [asyncFunction]);

    return { execute, loading, error, data };
}; 