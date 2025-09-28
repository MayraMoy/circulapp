var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Opcional: verificar token con /me endpoint (no implementado aún)
            const userData = JSON.parse(localStorage.getItem('user'));
            setUser(userData);
        }
        setLoading(false);
    }, []);
    const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield API.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
    });
    const register = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield API.post('/auth/register', { name, email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
    });
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, Object.assign({ value: { user, loading, login, register, logout } }, { children: children })));
};
