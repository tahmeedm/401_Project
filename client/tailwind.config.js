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
        neon: {
          blue: "#00f3ff",
          purple: "#9d4edd",
          pink: "#ff00e5",
          green: "#00ffa3",
        },
        cyber: {
          dark: "#0b0b0f",
          light: "#f0f0ff",
          blue: "#0072ff",
          purple: "#7d00ff",
          teal: "#00e2c3",
        },
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
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(149, 76, 233, 0.5)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(149, 76, 233, 0.8)",
            transform: "scale(1.02)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 3s infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        shimmer: "shimmer 2s infinite linear",
      },
      backgroundImage: {
        "grid-white":
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
        "cyber-grid":
          "linear-gradient(rgba(149, 76, 233, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(149, 76, 233, 0.1) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(45deg, hsl(var(--primary)), hsl(191, 91%, 37%))",
      },
      boxShadow: {
        neon: '0 0 5px theme("colors.neon.purple"), 0 0 20px theme("colors.neon.purple")',
        "neon-blue": '0 0 5px theme("colors.neon.blue"), 0 0 20px theme("colors.neon.blue")',
        "neon-green": '0 0 5px theme("colors.neon.green"), 0 0 20px theme("colors.neon.green")',
        "glow-sm": "0 0 10px rgba(149, 76, 233, 0.5)",
        glow: "0 0 15px rgba(149, 76, 233, 0.6)",
        "glow-lg": "0 0 30px rgba(149, 76, 233, 0.7)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

