/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1400px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      colors: {
        'primary': '#cb3e22',
        'primary-dark': "#cf2300",
        'primary-light': '#f4e5ec',
        'text-dark': '#0f172a',
        'text-light': '#64748b',
        'extra-light': '#f8fafc'
      }
    },
  },
  plugins: [],
}

