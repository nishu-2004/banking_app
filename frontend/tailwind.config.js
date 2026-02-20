export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        kodbank: {
          primary: '#1e40af',
          secondary: '#1e3a8a',
          accent: '#f59e0b',
          light: '#f0f9ff',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(30, 64, 175, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(30, 64, 175, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
