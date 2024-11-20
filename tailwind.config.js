/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        sanFranciscoHeader: "url('/public/image-header.jpg')",
        Chicago: "url('/public/chicago-card.png')",
        LosAngeles: "url('/public/los-angeles-card.png')",
        Miami: "url('/public/miami-card.png')",
        Bali: "url('/public/bali-card.png')",

      },
      colors: {
        primary: "#8FA206",
        secondary: "#61AEC9",
        tertiary: "#CC2D4A",
        white: "#FFFFFF",
        black: "#000000",
    },
    backgroundColor: {
        primary: "#8FA206",
        secondary: "#61AEC9",
        tertiary: "#CC2D4A",
        white: "#FFFFFF",
        black: "#000000",
    },
    
    },
  },
  plugins: [],
};
