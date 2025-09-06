/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Retro color palette
        'retro-beige': '#F5F5DC',
        'retro-pink': '#F0A0A0',
        'retro-blue': '#87CEEB',
        'retro-cream': '#FFF8DC',
        'retro-brown': '#D2B48C',
        'retro-dark': '#2D2D2D',
        'retro-gray': '#696969',
        'retro-green': '#90EE90',
        'retro-yellow': '#FFFF99',
        'retro-red': '#FFB6C1',
      },
      fontFamily: {
        'pixel': ['Press Start 2P', 'monospace'],
        'retro': ['VT323', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pixel-bounce': 'pixel-bounce 0.3s ease-in-out',
        'glitch': 'glitch 0.3s ease-in-out',
        'flicker': 'flicker 2s infinite',
      },
      keyframes: {
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(0, 0, 0, 0.3)',
        'retro-lg': '8px 8px 0px 0px rgba(0, 0, 0, 0.3)',
        'retro-inset': 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
