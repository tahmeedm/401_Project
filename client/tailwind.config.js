/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
        primary: {
          DEFAULT: "hsl(var(--primary))",
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
        // Custom colors for FitMate
        cyan: {
          DEFAULT: "#0AEFFF",
          50: "#E6FDFF",
          100: "#CCFBFF",
          200: "#99F7FF",
          300: "#66F3FF",
          400: "#33EFFF",
          500: "#0AEFFF",
          600: "#00C5D4",
          700: "#009BA8",
          800: "#00717C",
          900: "#004750",
        },
        purple: {
          DEFAULT: "#6C63FF",
          50: "#FFFFFF",
          100: "#F5F4FF",
          200: "#D6D3FF",
          300: "#B7B2FF",
          400: "#9892FF",
          500: "#6C63FF",
          600: "#3A2EFF",
          700: "#0800F9",
          800: "#0600C6",
          900: "#050093",
        },
        coral: {
          DEFAULT: "#FF5757",
          50: "#FFFFFF",
          100: "#FFF0F0",
          200: "#FFD6D6",
          300: "#FFBCBC",
          400: "#FFA3A3",
          500: "#FF5757",
          600: "#FF2424",
          700: "#F00000",
          800: "#BD0000",
          900: "#8A0000",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(120deg, #0AEFFF 0%, #6C63FF 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(10, 239, 255, 0.05) 0%, rgba(108, 99, 255, 0.05) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(10, 239, 255, 0)" },
          "50%": { boxShadow: "0 0 20px 5px rgba(10, 239, 255, 0.3)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

