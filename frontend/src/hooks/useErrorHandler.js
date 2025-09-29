// src/hooks/useErrorHandler.js
import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsync = useCallback(async (asyncFn) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await asyncFn();
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 
                          err.message || 
                          'Ha ocurrido un error inesperado';
      setError(errorMessage);
      console.error('Error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return {
    error,
    isLoading,
    handleAsync,
    clearError
  };
};

// Componente de toast para errores
export const ErrorToast = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-md">
      <div className="flex items-center justify-between">
        <span className="text-sm">{error}</span>
        <button 
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200 text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};