import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
        brick: ["var(--font-brick-sans)", "sans-serif"],
      },
      fontSize: {
        h1: "32px",
        h2: "28px",
        h3: "20px",
        body: "16px",
      },
      colors: {
        primary: "#D90824", // Red
        dark: "#222222", // Charcoal
        light: "#F5F5F5", // White Smoke
      },
    },
  },
  plugins: [],
};

export default config;