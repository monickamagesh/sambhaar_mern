/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "screen-2xl": "1400px",
        "custom-1200": "1200px",
        "custom-900": "900px",
      },
      colors: {
        primary: "#ea580c",
        "primary-dark": "#d64b00",
        "primary-light": "#f4e5ec",
        "text-dark": "#0f172a",
        "text-light": "#64748b",
        "extra-light": "#f8fafc",
      },
      animation: {
        "loop-scroll": "loop-scroll 30s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      zIndex: {
        '51': '51',
        '100': '100',
      },
    },
  },
  plugins: [],
};