import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "rgb(var(--bg-default) / <alpha-value>)",
          surface: "rgb(var(--bg-surface) / <alpha-value>)",
          elevated: "rgb(var(--bg-elevated) / <alpha-value>)",
          muted: "rgb(var(--bg-muted) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border-default))",
          strong: "rgb(var(--border-strong))",
        },
        foreground: {
          DEFAULT: "rgb(var(--fg-default) / <alpha-value>)",
          muted: "rgb(var(--fg-muted) / <alpha-value>)",
          subtle: "rgb(var(--fg-subtle) / <alpha-value>)",
        },
        brand: {
          50: "#eef4ff",
          100: "#dae6ff",
          200: "#bcd2ff",
          300: "#8eb2ff",
          400: "#5a87ff",
          500: "#3b63f5",
          600: "#2647e0",
          700: "#1f37b8",
          800: "#1d3093",
          900: "#1e2d75",
          950: "#161d47",
        },
        success: {
          DEFAULT: "#10b981",
          soft: "rgba(16, 185, 129, 0.12)",
        },
        warning: {
          DEFAULT: "#f59e0b",
          soft: "rgba(245, 158, 11, 0.12)",
        },
        danger: {
          DEFAULT: "#ef4444",
          soft: "rgba(239, 68, 68, 0.12)",
        },
        info: {
          DEFAULT: "#06b6d4",
          soft: "rgba(6, 182, 212, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 99, 245, 0.15), transparent)",
        "brand-glow":
          "radial-gradient(circle at top left, rgba(59, 99, 245, 0.25), transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59, 99, 245, 0.4)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 32px -12px rgba(0,0,0,0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
