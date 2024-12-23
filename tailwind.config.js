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
      },
    },
  },
  plugins: [],
};
