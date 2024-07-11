/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                secondary: "var(--secondary)",
                text: "var(--text)",
                placeholder: "var(--placeholder)",
                brand: "var(--brand)"
            },
        },
    },
    plugins: [],
};
