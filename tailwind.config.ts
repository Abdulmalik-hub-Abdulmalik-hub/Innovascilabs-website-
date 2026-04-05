import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D4AF37", // Metallic Gold
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1E3A8A", // Trust Blue
          foreground: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
