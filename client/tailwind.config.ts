import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "fira-mono": ["Fira Mono", "monospace"],
        "josefin-sans": ["Josefin Sans", "sans-serif"],
      },
      colors: {
        primary: "#E34F4F",
        "primary-2": "#430F0F",
        "primary-text": "#F3BDBD",
        "primary-background": "#2F2828",
        secondary: "#DDB320",
        "secondary-text": "#F8EFCF",
        "secondary-2": "#BE9A1B",
        "secondary-3": "#8B721A",
      },
    },
  },
  plugins: [],
};
export default config;
