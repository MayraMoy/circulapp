// src/pages/Login.jsx - Con colores personalizados
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// Colores personalizados inline
const COLORS = {
  primary: '#16a085',
  primaryDark: '#138d75',
  primaryLight: '#48c9b0',
  secondary: '#2980b9',
  success: '#27ae60',
  error: '#e74c3c',
  textPrimary: '#2c3e50',
  textSecondary: '#7f8c8d',
  background: '#ecf0f1',
  backgroundPaper: '#ffffff'
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: COLORS.background }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ backgroundColor: COLORS.backgroundPaper }}
      >
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: COLORS.primary }}
          >
            Iniciar Sesión
          </h1>
        </div>

        {/* Error message */}
        {error && (
          <div 
            className="p-3 rounded-lg mb-4 text-sm"
            style={{ 
              backgroundColor: '#fadbd8',
              color: COLORS.error,
              border: `1px solid ${COLORS.error}33`
            }}
          >
            {error}
          </div>
        )}

        {/* Email field */}
        <div className="mb-4">
          <label 
            className="block mb-2 font-medium"
            style={{ color: COLORS.textPrimary }}
          >
            Correo electrónico
          </label>
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
            style={{
              borderColor: '#d5d7da',
              color: COLORS.textPrimary,
              backgroundColor: COLORS.backgroundPaper
            }}
            onFocus={(e) => {
              e.target.style.borderColor = COLORS.primary;
              e.target.style.boxShadow = `0 0 0 2px ${COLORS.primary}33`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d5d7da';
              e.target.style.boxShadow = 'none';
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-6">
          <label 
            className="block mb-2 font-medium"
            style={{ color: COLORS.textPrimary }}
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: '#d5d7da',
                color: COLORS.textPrimary,
                backgroundColor: COLORS.backgroundPaper
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.primary;
                e.target.style.boxShadow = `0 0 0 2px ${COLORS.primary}33`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d5d7da';
                e.target.style.boxShadow = 'none';
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              style={{ color: COLORS.textSecondary }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: loading ? COLORS.textSecondary : COLORS.primary,
            color: '#ffffff',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = COLORS.primaryDark;
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(22, 160, 133, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = COLORS.primary;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </span>
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        {/* Register link */}
        <p className="text-center mt-6" style={{ color: COLORS.textSecondary }}>
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            className="font-medium hover:underline focus:outline-none"
            style={{ color: COLORS.primary }}
            onClick={() => navigate('/register')}
          >
            Regístrate aquí
          </button>
        </p>
      </form>
    </div>
  );
}