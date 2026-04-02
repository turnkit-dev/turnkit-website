import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080C10',
        surface: '#0D1117',
        surface2: '#111820',
        border: '#1C2733',
        border2: '#243040',
        text: '#C9D3DD',
        muted: '#7D8FA0',
        faint: '#3A4B5C',
        accent: '#2F9CEB',
        accent2: '#1A6FAA',
        green: '#3DD68C',
        amber: '#F0A429',
        danger: '#F87171',
      },
      fontFamily: {
        display: ['var(--font-syne)'],
        mono: ['var(--font-dm-mono)'],
      },
      boxShadow: {
        accentGlow: '0 0 0 1px rgba(47, 156, 235, 0.2)',
      },
      backgroundImage: {
        grid48:
          'linear-gradient(#1C2733 1px, transparent 1px), linear-gradient(90deg, #1C2733 1px, transparent 1px)',
        heroGlow: 'radial-gradient(ellipse at center, rgba(47, 156, 235, 0.08) 0%, transparent 70%)',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        fadeUp: {
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulse: 'pulse 2s infinite',
        fadeUp: 'fadeUp 0.6s forwards',
      },
    },
  },
};

export default config;
