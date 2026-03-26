/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./modules/**/*.{ts,tsx}",
    "./shared/**/*.{ts,tsx}",
    "./views/**/*.{ts,tsx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Tailwind theme colors backed by your CSS variables in `styles/globals.css`.
        // The `oklch(from ... / <alpha-value>)` form allows Tailwind opacity modifiers like `bg-input/30`.
        border: "oklch(from var(--border) / <alpha-value>)",
        input: "oklch(from var(--input) / <alpha-value>)",
        ring: "oklch(from var(--ring) / <alpha-value>)",

        background: "oklch(from var(--background) / <alpha-value>)",
        foreground: "oklch(from var(--foreground) / <alpha-value>)",

        card: {
          DEFAULT: "oklch(from var(--card) / <alpha-value>)",
          foreground: "oklch(from var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(from var(--popover) / <alpha-value>)",
          foreground: "oklch(from var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(from var(--primary) / <alpha-value>)",
          foreground: "oklch(from var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(from var(--secondary) / <alpha-value>)",
          foreground: "oklch(from var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(from var(--muted) / <alpha-value>)",
          foreground: "oklch(from var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(from var(--accent) / <alpha-value>)",
          foreground: "oklch(from var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(from var(--destructive) / <alpha-value>)",
          foreground:
            "oklch(from var(--destructive-foreground) / <alpha-value>)",
        },

        chart: {
          1: "oklch(from var(--chart-1) / <alpha-value>)",
          2: "oklch(from var(--chart-2) / <alpha-value>)",
          3: "oklch(from var(--chart-3) / <alpha-value>)",
          4: "oklch(from var(--chart-4) / <alpha-value>)",
          5: "oklch(from var(--chart-5) / <alpha-value>)",
        },

        sidebar: {
          DEFAULT: "oklch(from var(--sidebar) / <alpha-value>)",
          foreground: "oklch(from var(--sidebar-foreground) / <alpha-value>)",
          primary: "oklch(from var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground":
            "oklch(from var(--sidebar-primary-foreground) / <alpha-value>)",
          accent: "oklch(from var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground":
            "oklch(from var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "oklch(from var(--sidebar-border) / <alpha-value>)",
          ring: "oklch(from var(--sidebar-ring) / <alpha-value>)",
        },

        // Allow `text-foreground` / `bg-background` / etc via direct keys.
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};
