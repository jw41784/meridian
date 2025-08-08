import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        meridian: {
          burgundy: "#4A2532",
          steel: "#607D8B",
          "light-gray": "#E0E4E8",
          dark: "#1A1A1A",
          text: "#333333",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.meridian.text"),
            a: {
              color: theme("colors.meridian.burgundy"),
              "&:hover": {
                color: theme("colors.meridian.steel"),
              },
            },
            h1: {
              color: theme("colors.meridian.dark"),
            },
            h2: {
              color: theme("colors.meridian.dark"),
            },
            h3: {
              color: theme("colors.meridian.dark"),
            },
            h4: {
              color: theme("colors.meridian.dark"),
            },
            code: {
              color: theme("colors.meridian.burgundy"),
            },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        invert: {
          css: {
            color: theme("colors.gray.300"),
            '[class~="lead"]': {
              color: theme("colors.gray.300"),
            },
            a: {
              color: theme("colors.meridian.steel"),
              "&:hover": {
                color: theme("colors.meridian.light-gray"),
              },
            },
            strong: {
              color: theme("colors.gray.100"),
            },
            "ol > li::marker": {
              color: theme("colors.gray.400"),
            },
            "ul > li::marker": {
              color: theme("colors.gray.400"),
            },
            hr: {
              borderColor: theme("colors.gray.700"),
            },
            blockquote: {
              color: theme("colors.gray.300"),
              borderLeftColor: theme("colors.gray.600"),
            },
            h1: {
              color: theme("colors.gray.100"),
            },
            h2: {
              color: theme("colors.gray.100"),
            },
            h3: {
              color: theme("colors.gray.100"),
            },
            h4: {
              color: theme("colors.gray.100"),
            },
            "figure figcaption": {
              color: theme("colors.gray.400"),
            },
            code: {
              color: theme("colors.meridian.steel"),
              backgroundColor: theme("colors.gray.800"),
            },
            "a code": {
              color: theme("colors.meridian.steel"),
            },
            pre: {
              color: theme("colors.gray.200"),
              backgroundColor: theme("colors.gray.800"),
              borderColor: theme("colors.gray.700"),
            },
            "pre code": {
              color: theme("colors.gray.200"),
              backgroundColor: "transparent",
            },
            thead: {
              color: theme("colors.gray.100"),
              borderBottomColor: theme("colors.gray.600"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.gray.700"),
            },
            "tbody td": {
              color: theme("colors.gray.300"),
            },
            p: {
              color: theme("colors.gray.300"),
            },
            em: {
              color: theme("colors.gray.300"),
            },
            li: {
              color: theme("colors.gray.300"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
