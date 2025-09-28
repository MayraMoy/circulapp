import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    if (!user)
        return _jsx(Navigate, { to: "/login" });
    return children;
}
function App() {
    return (_jsx(AuthProvider, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: localStorage.getItem('token') ? '/dashboard' : '/login' }) })] }) }) }));
}
export default App;
