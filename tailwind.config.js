/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['var(--font-ibm)', 'sans-serif'],
        },
        colors: {
            primary: '#3b82f6',
            secondary: '#8b5cf6',
        },
        },
    },
    plugins: [],
}