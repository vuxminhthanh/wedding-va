import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F1",
        ivory: "#FFFDF8",
        sage: "#6F8B6B",
        "sage-deep": "#314034",
        ink: "#2F2B28",
        champagne: "#D8C7A3"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        serif: [
          "Cormorant Garamond",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif"
        ]
      },
      boxShadow: {
        soft: "0 18px 50px rgb(49 64 52 / 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
