/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Include your app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include components folder
    "./screens/**/*.{js,jsx,ts,tsx}", // Include screens folder
  ],
  presets: [require("nativewind/preset")], // NativeWind preset
  theme: {
    extend: {
      fontFamily: {
        sans: ["System", "Arial"], // Default system fonts
      },
      colors: {
        app_orange_color: "#C67C4E",
      }
    },
  },
  
  plugins: [], // Add any Tailwind plugins if needed
};

