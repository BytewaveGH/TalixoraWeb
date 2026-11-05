/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/*
 * Material Tailwind (used by the admin portal) replaces Tailwind's default colour palette,
 * so the palettes the marketing site relies on are added back explicitly below.
 */
module.exports = withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', lg: '2rem' }, screens: { '2xl': '1240px' } },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        display: ['var(--font-display)', 'var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        slate: colors.slate,
        neutral: colors.neutral,
        rose: colors.rose,
        emerald: colors.emerald,
        sky: colors.sky,
        violet: colors.violet,
        amber: colors.amber,
        // Talixora
        ink: {
          950: '#070A14',
          900: '#0B1020',
          800: '#141A2E',
          700: '#1F2740',
          600: '#2E3754',
        },
        brand: {
          50: '#EEF0FF',
          100: '#DFE2FF',
          200: '#C2C7FF',
          300: '#9BA1FF',
          400: '#7A7CFB',
          500: '#5D5AF2',
          600: '#4B42DE',
          700: '#3E35BB',
          800: '#332E96',
          900: '#2D2B77',
        },
        mint: {
          300: '#7FF0DA',
          400: '#3EDDC0',
          500: '#17C3A6',
        },
        // Product brands
        sellix: {
          purple: '#9B35F2',
          blue: '#16A5F0',
          deep: '#0865AC',
          50: '#F5EEFF',
          100: '#EBDDFE',
        },
        bidchale: {
          yellow: '#FBCA08',
          black: '#0A0A0A',
          50: '#FFF9DB',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px -6px rgba(16,24,40,.08)',
        lift: '0 2px 4px rgba(16,24,40,.04), 0 24px 48px -12px rgba(16,24,40,.18)',
        glow: '0 0 0 1px rgba(122,124,251,.25), 0 20px 60px -15px rgba(93,90,242,.55)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(15,23,42,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,.06) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)',
        'sellix-gradient': 'linear-gradient(135deg, #9B35F2 0%, #5D5AF2 50%, #16A5F0 100%)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseDot: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.35 } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // Legacy utilities kept for the admin portal.
    plugin(({ addUtilities }) => {
      addUtilities({
        '.my-rotate-y-180': { transform: 'rotateY(180deg)' },
        '.preserve-3d': { transformStyle: 'preserve-3d' },
        '.perspective': { perspective: '1000px' },
        '.backface-hidden': { backfaceVisibility: 'hidden' },
      })
    }),
  ],
})
