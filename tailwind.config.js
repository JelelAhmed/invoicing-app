// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // backgrounds
        "content-bg": "#F5F6FA", // content frame background
        "sidebar-from": "#DAF0FA",
        "sidebar-to": "#FFFCE2",
        primary: "#003EFF",

        // text colors (from Figma)
        "text-dark": "#373B47",
        "text-inactive": "#697598", // inactive menu text
        "text-active": "#4F4F4F", // active menu text

        // status colors
        muted: "#666F77",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      width: {
        sidebar: "280px",
        content: "1160px",
      },
      maxWidth: {
        content: "1160px",
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"], // 👈 Add Inter
      },
    },
  },
  plugins: [],
};
