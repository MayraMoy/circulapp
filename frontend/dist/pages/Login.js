var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield login(email, password);
            navigate('/dashboard');
        }
        catch (err) {
            alert('Error al iniciar sesión');
        }
    });
    return (_jsx("div", Object.assign({ className: "min-h-screen flex items-center justify-center bg-gray-50" }, { children: _jsxs("form", Object.assign({ onSubmit: handleSubmit, className: "bg-white p-8 rounded shadow-md w-96" }, { children: [_jsx("h2", Object.assign({ className: "text-2xl font-bold mb-6 text-center" }, { children: "Iniciar Sesi\u00F3n" })), _jsx("input", { type: "email", placeholder: "Email", className: "w-full p-2 mb-4 border rounded", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx("input", { type: "password", placeholder: "Contrase\u00F1a", className: "w-full p-2 mb-4 border rounded", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("button", Object.assign({ type: "submit", className: "w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" }, { children: "Entrar" }))] })) })));
}
