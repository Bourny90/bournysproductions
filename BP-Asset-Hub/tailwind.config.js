/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bp-dark': '#050505',
        'bp-darker': '#0a0a0a',
        'bp-card': '#121212',
        'bp-red': '#dc2626',
        'bp-red-hover': '#b91c1c',
      },
      backgroundImage: {
        'red-glow': 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, rgba(5, 5, 5, 0) 70%)',
        'gradient-red': 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(220, 38, 38, 0.3)',
        'red-glow-lg': '0 0 40px rgba(220, 38, 38, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
