/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            oswald: '"Oswald", sans-serif',
            didact: '"Didact Gothic", sans-serif',
         },
         colors: {
            ourAsh: "#a9a9a9", // Ash
            ourBlack: `#101010`, // Black
            ourPrimary: "#F86244", // Red
            ourLighterBlack: "#1B1B1B",
         },
      },
   },
   plugins: [require("daisyui")],
};
