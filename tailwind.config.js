/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        xl: "24px",
      },
      lineHeight: {
        xl: "30.24px",
      },
      colors: {
        "form-bg": "#C6E0FF", // Form background
        "button-blue": "#1A73E8", // Button
        "icons-bg": "#7DCAFA", // Icons background
        "link-blue": "#1A73E8", // Links
        "light-bg": "#E2EFFF", // Light background
        "header-bg": "#C6E0FF", // Header background
        "sidebar-bg": "#C6E0FF", // Sidebar background
        "button-red": "#C6433D", // Red button
        "button-green": "#338F37", // Green button
        "modal-bg": "#ECF5FF", // Modal background
        "button-navy": "#031F42", // Navy button
        "button-black": "#222222", // Black button
        "button-yellow": "#C07906", // Yellowish button
        "custom-div-blue": "#B5D5FF",
        "custom-border-blue": "#C9E2FF",
        "gradient-blue": "#7DCAFA",
        "custom-button-green": "#19A04D",
        "custom-text-area": "#E1EFFF",
      },
      backgroundImage: {
        "card-blue-gradient":
          "linear-gradient(90deg, #95C3FF 0%, #929FF5 100%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        loading: "loading 1.5s ease-in-out infinite",
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
      },
    },
  },
  plugins: [],
};
