import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFF5D4", // Lightest shade for subtle highlights
          200: "#FFE6A2", // Lighter shade for soft backgrounds
          300: "#FFD870", // Slightly muted for hover effects
          400: "#FDC01A", // Default (main primary color, preserved)
          DEFAULT: "#FDC01A", // Ensures default remains intact
          500: "#E0AA16", // Darker shade for borders or text
          600: "#B38312", // Even darker for emphasis
          700: "#87650E", // Deepest shade for bold elements
        },
        secondary: {
          100: "#F5F7FA",
          200: "#ECEEF4",
          300: "#D2D5E2",
          400: "#B6BCCD",
          500: "#9EA5BD",
          600: "#79829F",
          700: "#626981",
          800: "#4B5162",
          900: "#343844",
          1000: "#1C1F25",
        },
        accent: {
          teal: "#00B8A9",
          softBlue: "#5BCEFA",
        },
        neutral: {
          warmGray: "#F0F0F0",
          charcoal: "#222831",
        },
        supporting: {
          richRed: "#FF6F61",
          emeraldGreen: "#34D399",
        },
        tertiary: {
          mutedLavender: "#A78BFA",
          dustyRose: "#D97777",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
