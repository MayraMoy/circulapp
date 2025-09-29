// src/components/Layout.jsx - Con colores personalizados
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Colores personalizados
const COLORS = {
  primary: '#16a085',
  primaryDark: '#138d75',
  primaryLight: '#48c9b0',
  secondary: '#2980b9',
  textPrimary: '#2c3e50',
  textSecondary: '#7f8c8d',
  background: '#ecf0f1',
  backgroundPaper: '#ffffff',
  border: '#e0e0e0',
  hover: '#f8f9fa'
};

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
    { name: 'Educativo', path: '/educational', icon: '📚' }
  ];

  // Agregar item para gestores
  if (user?.role === 'gestor') {
    navItems.push({ name: 'Validar', path: '/validate', icon: '✅' });
  }

  if (!user) return <>{children}</>;

  return (
    <div 
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Top Navigation Bar */}
      <header 
        className="sticky top-0 z-50 shadow-sm"
        style={{ backgroundColor: COLORS.backgroundPaper }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              className="text-xl font-bold cursor-pointer flex items-center hover:opacity-80 transition-opacity"
              style={{ color: COLORS.primary }}
              onClick={() => navigate('/dashboard')}
            >
              <span className="mr-2">♻️</span>
              CirculApp
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    style={{
                      color: isActive ? COLORS.primary : COLORS.textPrimary,
                      backgroundColor: isActive ? COLORS.primaryLight + '20' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = COLORS.hover;
                        e.target.style.color = COLORS.primary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = COLORS.textPrimary;
                      }
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg focus:outline-none hover:shadow-md transition-all duration-200"
                style={{ 
                  backgroundColor: showProfileMenu ? COLORS.primaryLight + '20' : 'transparent',
                  border: `1px solid ${showProfileMenu ? COLORS.primary : 'transparent'}`
                }}
                onMouseEnter={(e) => {
                  if (!showProfileMenu) {
                    e.target.style.backgroundColor = COLORS.hover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showProfileMenu) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                  <div 
                    className="font-medium text-sm"
                    style={{ color: COLORS.textPrimary }}
                  >
                    {user.name}
                  </div>
                  <div 
                    className="text-xs capitalize"
                    style={{ color: COLORS.textSecondary }}
                  >
                    {user.role}
                  </div>
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} 
                  style={{ color: COLORS.textSecondary }}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-2 z-50 border animate-in slide-in-from-top-1 duration-200"
                  style={{ 
                    backgroundColor: COLORS.backgroundPaper,
                    borderColor: COLORS.border
                  }}
                >
                  {/* User info in dropdown */}
                  <div className="px-4 py-3 border-b" style={{ borderColor: COLORS.border }}>
                    <div 
                      className="font-medium"
                      style={{ color: COLORS.textPrimary }}
                    >
                      {user.name}
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: COLORS.textSecondary }}
                    >
                      {user.email}
                    </div>
                    <div 
                      className="text-xs mt-1 px-2 py-1 rounded-full inline-block"
                      style={{ 
                        backgroundColor: COLORS.primaryLight + '30',
                        color: COLORS.primary
                      }}
                    >
                      {user.role}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-sm hover:transition-colors duration-150"
                    style={{ color: COLORS.textPrimary }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = COLORS.hover;
                      e.target.style.color = COLORS.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = COLORS.textPrimary;
                    }}
                  >
                    <span className="mr-3">👤</span>
                    Mi Perfil
                  </button>

                  <button
                    onClick={() => {
                      navigate('/educational');
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-sm hover:transition-colors duration-150"
                    style={{ color: COLORS.textPrimary }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = COLORS.hover;
                      e.target.style.color = COLORS.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = COLORS.textPrimary;
                    }}
                  >
                    <span className="mr-3">📚</span>
                    Material Educativo
                  </button>

                  <div className="border-t my-1" style={{ borderColor: COLORS.border }}></div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-sm hover:transition-colors duration-150"
                    style={{ color: COLORS.textPrimary }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#fee2e2';
                      e.target.style.color = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = COLORS.textPrimary;
                    }}
                  >
                    <span className="mr-3">🚪</span>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className="md:hidden px-4 pb-3 flex justify-around border-t"
          style={{ borderColor: COLORS.border }}
        >
          {navItems.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center py-2 px-3 text-xs transition-all duration-200 rounded-lg"
                style={{
                  color: isActive ? COLORS.primary : COLORS.textSecondary,
                  backgroundColor: isActive ? COLORS.primaryLight + '20' : 'transparent'
                }}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="flex-grow px-4 py-6"
        style={{ backgroundColor: COLORS.background }}
      >
        {children}
      </main>

      {/* Footer (opcional) */}
      <footer 
        className="py-4 text-center text-sm border-t"
        style={{ 
          backgroundColor: COLORS.backgroundPaper,
          color: COLORS.textSecondary,
          borderColor: COLORS.border
        }}
      >
        <p>
          © 2025 CirculApp - Plataforma de economía circular colaborativa
        </p>
      </footer>
    </div>
  );
}