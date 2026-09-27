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
        '3d': '0 1px 2px rgba(0, 0, 0, 0.03), 0 8px 20px -3px rgba(15, 23, 42, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        '3d-hover': '0 4px 8px rgba(0, 0, 0, 0.04), 0 18px 36px -4px rgba(15, 23, 42, 0.14), inset 0 1px 0 rgba(255, 255, 255, 1)',
        '3d-pop': '0 2px 4px rgba(0, 0, 0, 0.04), 0 12px 24px -2px rgba(15, 23, 42, 0.10)',
        '3d-sm': '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 10px -1px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        '3d-btn': '0 3px 0 rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)',
        '3d-terracotta': '0 3px 0 #6e3221, 0 6px 16px rgba(150, 75, 52, 0.28)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float-slow': 'floatSlow 4s ease-in-out infinite',
        'pop-in': 'popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
}
