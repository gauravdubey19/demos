import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const baseConfig: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        color: {
          tertiary: "#494949",
        },
        strokeLight: "#D8D8D8",
        green: "#2CD396",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "-translateY(100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "slide-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "motion-right": {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-35px)" },
          "50%": { transform: "translateX(0)" },
          "75%": { transform: "translateX(-30px)" },
          "100%": { transform: "translateX(0)" },
        },
        "motion-left": {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(35px)" },
          "50%": { transform: "translateX(0)" },
          "75%": { transform: "translateX(30px)" },
          "100%": { transform: "translateX(0)" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-15px)" },
          "50%": { transform: "translateX(10px)" },
          "75%": { transform: "translateX(-20px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.5s ease-in-out",
        "slide-down": "slide-down 0.5s ease-in-out",
        "slide-right": "slide-right 0.8s ease-in-out",
        "slide-left": "slide-left 0.8s ease-in-out",
        "motion-right": "motion-right 1.5s ease-in-out",
        "motion-left": "motion-left 1.5s ease-in-out",
        shake: "shake 0.3s ease-in-out",
      },
      fontFamily: {
        dmSansBold: ["DM-sans-bold", "sans-serif"],
        dmSans: ["DM-sans", "sans-serif"],
        dmSansSemiBold: ["DM-sans-semibold", "sans-serif"],
        montBold: ["Montserrat-bold", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
        montSemiBold: ["Montserrat-semibold", "sans-serif"],
      },
      spacing: {
        word: "0.25em",
      },
      transitionDuration: {
        '5000': '5000ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};

// Wrap the baseConfig with withUt
export default withUt(baseConfig);
