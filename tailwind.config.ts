import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      "0.3": "0.3px",
      "0.5": "0.5px",
      "2": "2px",
      "3": "3px",
    },
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(304deg, rgb(2, 0, 36) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-dark": "rgb(2, 0, 36)",
        "custom-blue": "rgba(9, 9, 121, 1)",
        "custom-light": "rgba(0, 212, 255, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
