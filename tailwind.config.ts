import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        present: '#F6E05E',
        late: '#F6AD55',
        absent: '#F56565',
        unknown: '#CBD5E0',
      },
    },
  },
  plugins: [],
} satisfies Config;
