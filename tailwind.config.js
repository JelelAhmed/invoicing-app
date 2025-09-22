module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // main indigo (buttons, highlights)
          light: "#6366F1",
          dark: "#3730A3",
        },
        secondary: {
          DEFAULT: "#1E293B", // slate/dark gray text
          light: "#475569",
          dark: "#0F172A",
        },
        neutral: {
          50: "#F8FAFC", // backgrounds
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
