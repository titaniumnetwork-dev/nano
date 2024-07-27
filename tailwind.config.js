/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                Crust: "var(--Crust)",
                Base: "var(--Base)",
                Surface0: "var(--Surface0)",
                Text: "var(--Text)",
                Subtext0: "var(--Subtext0)",
                Blue: "var(--Blue)",
            },
        },
    },
    safelist: ["hidden", "w-0", "m-0"],
    plugins: [],
};
