import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        "accent-blue": "#3B82F6",
        surface: "#F8FAFC",
        "text-secondary": "#64748B",
        "success-green": "#22C55E",
        "brand-border": "#E2E8F0",
      },
    },
  },
  plugins: [],
};
export default config;
