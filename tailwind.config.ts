import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#202124",
        mist: "#eef2f1",
        moss: "#4d6f5d",
        clay: "#c8754b",
        sun: "#f4c95d",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(32, 33, 36, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
