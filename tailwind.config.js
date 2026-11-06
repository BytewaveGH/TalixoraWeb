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
        // Talixora navy — dark surfaces, tuned toward the logo navy (#011149)
        ink: {
          950: '#040A1F',
          900: '#071233',
          800: '#0F1B42',
          700: '#1A2652',
          600: '#2A3766',
        },
        // Talixora brand blue — matched to the logo (#0070FF bright blue, #011149 navy)
        brand: {
          50: '#EEF5FF',
          100: '#D9E8FF',
          200: '#B5D2FF',
          300: '#7FB2FF',
          400: '#3D8BFF',
          500: '#0A6CF5',
          600: '#0052D6',
          700: '#0041AD',
          800: '#023489',
          900: '#011E5C',
        },
        // Accent cyan — matched to the logo's light end (#00CEFC)
        mint: {
          300: '#7EE7FF',
          400: '#1FD0FB',
          500: '#00B4E6',
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
        glow: '0 0 0 1px rgba(61,139,255,.25), 0 20px 60px -15px rgba(10,108,245,.55)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(15,23,42,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,.06) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)',
        'sellix-gradient': 'linear-gradient(135deg, #9B35F2 0%, #6A4CF0 50%, #16A5F0 100%)',
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
