// frontend/src/components/Layout.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Explorar', path: '/search', icon: '🔍' },
    { name: 'Publicar', path: '/publish', icon: '➕' },
    { name: 'Mensajes', path: '/messages', icon: '💬' }
  ];

  if (!user) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="text-xl font-bold text-primary cursor-pointer flex items-center"
              onClick={() => navigate('/dashboard')}
            >
              CirculApp
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-1 font-medium ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-text-primary hover:text-primary'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-text-primary font-medium">
                  {user.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-text-primary hover:bg-gray-100"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-text-primary hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation (optional, if needed) */}
        <div className="md:hidden px-4 pb-2 flex justify-around border-t border-gray-200">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 text-xs ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-text-secondary'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer (opcional, solo en landing) */}
      {/* No se incluye aquí porque el PDF muestra footer solo en landing */}
    </div>
  );
}