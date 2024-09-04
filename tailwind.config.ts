import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          one: "#8383ff",
          two: "#f39237",
          three: "#094074",
        },
        neutral: {
          light: "#FAFAFA",
          dark01: "#333333",
          dark02: "#616161",
          dark03: "#888888",
        },
      },
    },
  },
  plugins: [],
};
export default config;
