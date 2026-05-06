import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        olive: "#7E9258",
        "dusty-pink": "#D6B5BD",
        lavender: "#B8A9F0",
        "lavender-light": "#F0EEFF",
        "lavender-deep": "#9B89E8",
        "lavender-muted": "#E8E3FF",
        petal: "#F2A8C4",
        "petal-light": "#FEF0F6",
        "petal-deep": "#E88AAF",
        "petal-muted": "#FCE4EF",
        butter: "#F5D97A",
        "butter-light": "#FFFBE8",
        "butter-deep": "#E8C95A",
        "butter-muted": "#FFF8D6",
        mint: "#A8E6CF",
        "mint-light": "#EDFAF4",
        "mint-deep": "#7DD4B0",
        cream: "#D6B5BD",
        surface: "#FFFFFF",
        border: "#EBEBEB",
        "border-mid": "#D4D4D4",
        "text-primary": "#2D2640",
        "text-secondary": "#6B6480",
        "text-muted": "#A09AB8"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"]
      },
      borderRadius: {
        xl2: "16px",
        xl3: "24px",
        xl4: "32px"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shake: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" }
        }
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        shake: "shake 1.2s ease-in-out infinite"
      },
      boxShadow: {
        soft: "0 2px 16px rgba(0,0,0,0.06)"
      },
      maxWidth: {
        content: "1120px"
      }
    }
  },
  plugins: []
};

export default config;
