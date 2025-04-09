import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ управление тёмной темой через класс
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        sm: "16px",
        md: "24px",
        lg: "64px",
        xl: "80px",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#001E80",
        secondary: "#3A50FF",

        // ✅ Светлая тема
        "light-bg": "#F8FAFF",
        "light-foreground": "#001E80",
        "light-card": "#FFFFFF",
        "light-muted": "#6B7280",
        "light-border": "#E5E7EB",

        // ✅ Тёмная тема
        "dark-bg": "#0D1117",
        "dark-foreground": "#F8FAFF",
        "dark-card": "#161B22",
        "dark-muted": "#9CA3AF",
        "dark-border": "#30363D",
      },
      animation: {
        pulseSlow: "pulse 3s infinite",
      },
      typography: ({ theme }: { theme: any }) => ({
        dark: {
          css: {
            color: theme("colors.dark-foreground"),
            a: { color: theme("colors.secondary") },
            strong: { color: theme("colors.dark-foreground") },
            'ul > li::before': { backgroundColor: theme("colors.dark-foreground") },
            hr: { borderColor: theme("colors.dark-border") },
            blockquote: {
              color: theme("colors.dark-foreground"),
              borderLeftColor: theme("colors.dark-border"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
};

export default config;
