/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            poppins: '"Poppins", sans-serif',
         },
         colors: {
            ourAsh: "#888888", // Ash
            ourBlack: `#101010`, // Black
            ourPrimary: "#F86244", // Red
            ourLighterBlack: "#1B1B1B",
         },
      },
   },
   plugins: [require("daisyui")],
};
