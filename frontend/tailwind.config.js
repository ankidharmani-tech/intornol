/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f4f6f8',
        navy: {
          950: '#0B111E',
          900: '#0F172A',
          850: '#152033',
          800: '#1E293B',
          700: '#334155',
        },
        terracotta: {
          DEFAULT: '#964B34',
          hover: '#823D28',
          light: '#FDF4F2',
          border: '#F8D5CE',
        },
        brandYellow: {
          DEFAULT: '#F5C244',
          hover: '#EAB332',
          light: '#FEF8E7',
          border: '#FDE49E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 4px 14px -3px rgba(0, 0, 0, 0.07), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 0 0 1px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
