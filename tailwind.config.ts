import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0c",
        bg1: "#111113",
        bg2: "#18181c",
        border: "#242429",
        borderSoft: "#1c1c20",
        text: "#f5f5f7",
        textDim: "#9a9aa2",
        textFaint: "#84848c",
        accent: "#3fd0ff",
        accent2: "#ff7a68",
      },
      fontFamily: {
        disp: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "20px",
      },
    },
  },
  plugins: [],
};
export default config;
