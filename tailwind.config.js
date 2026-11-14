/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: "#050B14",
          card: "#0D1829",
          border: "#1E293B",
          accent: "#00E5FF",
          nasa: "#0B3D91",
        },
        mangrove: {
          500: "#10B981",
          700: "#047857",
        },
        caatinga: {
          500: "#F59E0B",
          700: "#B45309",
        },
        radar: {
          cyan: "#00F0FF",
          red: "#FF3366",
          yellow: "#FFE600",
        }
      },
    },
  },
  plugins: [],
};
