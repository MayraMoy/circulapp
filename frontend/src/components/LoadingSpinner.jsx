// src/components/LoadingSpinner.jsx
import React from 'react';

export const LoadingSpinner = ({ size = 'md', message = 'Cargando...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${sizeClasses[size]} border-4 border-green-300 border-t-green-600 rounded-full animate-spin`}></div>
      {message && <p className="mt-2 text-gray-500 text-sm">{message}</p>}
    </div>
  );
};

// Skeleton para listas de items
export const ItemSkeleton = () => (
  <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
    <div className="flex gap-4">
      <div className="w-20 h-20 bg-gray-200 rounded"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

// Layout de carga completa
export const PageLoading = ({ message = 'Cargando página...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="lg" message={message} />
  </div>
);