// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import API from '../services/Api'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Error al parsear usuario:', err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Iniciar sesión
  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user: userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      // ✅ Lanza el error para que el componente lo maneje
      throw err;
    }
  };

  // Registrarse
  const register = async (name, email, password) => {
    try {
      const res = await API.post('/auth/register', { 
        name, 
        email, 
        password, 
        role: 'user'
      });
      const { token, user: userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      // ✅ Lanza el error para que el componente lo maneje
      throw err;
    }
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // ✅ Actualizar perfil en tiempo real
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};