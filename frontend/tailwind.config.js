module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // ← Poppins como fuente predeterminada
      },
      colors: {
        primary: { DEFAULT: '#16A085', light: '#4ECDC4', dark: '#117A65' },
        secondary: { DEFAULT: '#F39C12', light: '#F8C471', dark: '#E67E22' },
        tertiary: { DEFAULT: '#8E44AD', light: '#BB8FCE', dark: '#6C3483' },
        success: { DEFAULT: '#27AE60', light: '#58D68D', dark: '#1E8449' },
        warning: { DEFAULT: '#F39C12', light: '#F8C471', dark: '#E67E22' },
        error: { DEFAULT: '#E74C3C', light: '#F1948A', dark: '#C0392B' },
        text: { primary: '#2C3E50', secondary: '#5D6D7E', disabled: '#BDC3C7' },
        background: { DEFAULT: '#EFEFEF', paper: '#FFFFFF', subtle: '#EFEFEF' },
        gray: { 50: '#FAFBFC', 100: '#F4F6F8', 200: '#E9ECEF', 300: '#DEE2E6' }
      },
      backgroundImage: {
        'gradient-testimonial': 'linear-gradient(135deg, #16A085, #1ABC9C)',
        'gradient-hero': 'linear-gradient(135deg, #2C3E50 0%, #16A085 100%)',
      }
    },
  },
  plugins: [],
}