// frontend/src/pages/Register.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// Colores personalizados
const COLORS = {
  primary: '#16a085',
  primaryDark: '#138d75',
  primaryLight: '#48c9b0',
  secondary: '#2980b9',
  success: '#27ae60',
  error: '#e74c3c',
  warning: '#f39c12',
  textPrimary: '#2c3e50',
  textSecondary: '#7f8c8d',
  background: '#ecf0f1',
  backgroundPaper: '#ffffff'
};

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Ingresa un email válido');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    return true;
  };

  // ✅ FUNCIÓN handleSubmit (CORREGIDA)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      // ✅ Usa el mensaje REAL del backend (no uno genérico)
      const errorMsg = err.response?.data?.msg || 'Error al registrarse. Inténtalo más tarde.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderColor: '#d5d7da',
    color: COLORS.textPrimary,
    backgroundColor: COLORS.backgroundPaper
  };

  const focusStyle = {
    borderColor: COLORS.primary,
    boxShadow: `0 0 0 2px ${COLORS.primary}33`
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
            Crear Cuenta
          </h1>
          <p 
            className="text-sm mt-2"
            style={{ color: COLORS.textSecondary }}
          >
            Únete a la red de reciclaje colaborativo
          </p>
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
            ⚠️ {error}
          </div>
        )}

        {/* Name field */}
        <div className="mb-4">
          <label 
            className="block mb-2 font-medium"
            style={{ color: COLORS.textPrimary }}
          >
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#d5d7da';
              e.target.style.boxShadow = 'none';
            }}
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
          />
        </div>

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
            name="email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = '#d5d7da';
              e.target.style.boxShadow = 'none';
            }}
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label 
            className="block mb-2 font-medium"
            style={{ color: COLORS.textPrimary }}
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#d5d7da';
                e.target.style.boxShadow = 'none';
              }}
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
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

        {/* Confirm Password field */}
        <div className="mb-6">
          <label 
            className="block mb-2 font-medium"
            style={{ color: COLORS.textPrimary }}
          >
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = '#d5d7da';
                e.target.style.boxShadow = 'none';
              }}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ color: COLORS.textSecondary }}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
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
              Creando cuenta...
            </span>
          ) : (
            'Crear Cuenta'
          )}
        </button>

        {/* Login link */}
        <p className="text-center mt-6" style={{ color: COLORS.textSecondary }}>
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            className="font-medium hover:underline focus:outline-none"
            style={{ color: COLORS.primary }}
            onClick={() => navigate('/login')}
          >
            Inicia sesión aquí
          </button>
        </p>

        {/* Terms note */}
        <div 
          className="mt-4 p-3 rounded-lg text-xs text-center"
          style={{ 
            backgroundColor: COLORS.primaryLight + '15',
            color: COLORS.textSecondary
          }}
        >
          Al registrarte, aceptas nuestros términos de servicio y política de privacidad
        </div>
      </form>
    </div>
  );
}
