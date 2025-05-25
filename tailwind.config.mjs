/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'meridian': {
          'burgundy': '#4A2532',
          'steel': '#607D8B',
          'light-gray': '#E0E4E8',
          'dark': '#1A1A1A',
          'text': '#333333',
        }
      },
      fontFamily: {
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.meridian.text'),
            a: {
              color: theme('colors.meridian.burgundy'),
              '&:hover': {
                color: theme('colors.meridian.steel'),
              },
            },
            h1: {
              color: theme('colors.meridian.dark'),
            },
            h2: {
              color: theme('colors.meridian.dark'),
            },
            h3: {
              color: theme('colors.meridian.dark'),
            },
            h4: {
              color: theme('colors.meridian.dark'),
            },
            code: {
              color: theme('colors.meridian.burgundy'),
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}