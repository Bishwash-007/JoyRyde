/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : 'class',
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    './utils/**/*.{html,js,jsx,ts,tsx,mdx}',
    './*.{html,js,jsx,ts,tsx,mdx}',
    './src/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  important: 'html',
  theme: {
    extend: {
      colors: {
        // Base
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',

        // Text
        text: 'rgb(var(--text) / <alpha-value>)',
        textMuted: 'rgb(var(--text-muted) / <alpha-value>)',
        textInverted: 'rgb(var(--text-inverted) / <alpha-value>)',

        // Primary
        primary: 'rgb(var(--primary) / <alpha-value>)',
        primaryForeground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        primaryMuted: 'rgb(var(--primary-muted) / <alpha-value>)',
        primaryForegroundMuted:
          'rgb(var(--primary-foreground-muted) / <alpha-value>)',

        // Secondary
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        secondaryForeground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        secondaryMuted: 'rgb(var(--secondary-muted) / <alpha-value>)',
        secondaryForegroundMuted:
          'rgb(var(--secondary-foreground-muted) / <alpha-value>)',

        // Accent
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentForeground: 'rgb(var(--accent-foreground) / <alpha-value>)',

        // Card
        card: 'rgb(var(--card) / <alpha-value>)',
        cardForeground: 'rgb(var(--card-foreground) / <alpha-value>)',

        // Popover / Tooltip
        popover: 'rgb(var(--popover) / <alpha-value>)',
        popoverForeground: 'rgb(var(--popover-foreground) / <alpha-value>)',
        overlay: 'rgb(var(--overlay))',

        // Border
        border: 'rgb(var(--border) / <alpha-value>)',
        borderMuted: 'rgb(var(--border-muted) / <alpha-value>)',
        border50: 'rgb(var(--border-50) / <alpha-value>)',
        border100: 'rgb(var(--border-100) / <alpha-value>)',
        border200: 'rgb(var(--border-200) / <alpha-value>)',
        border300: 'rgb(var(--border-300) / <alpha-value>)',

        // Input
        input: 'rgb(var(--input) / <alpha-value>)',
        inputForeground: 'rgb(var(--input-foreground) / <alpha-value>)',

        // Status
        error: 'rgb(var(--error) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',

        // Rings
        ring: 'rgb(var(--ring) / <alpha-value>)',
        ringOffset: 'rgb(var(--ring-offset) / <alpha-value>)',

        // Shadows
        shadowColor: 'rgb(var(--shadow-color))',
      },
      fontFamily: {
        // Poppins
        Thin: ['Poppins_100Thin'],
        Light: ['Poppins_200ExtraLight'],
        Regular: ['Poppins_400Regular'],
        SemiBold: ['Poppins_600SemiBold'],
        Bold: ['Poppins_700Bold'],

        // Roboto
        Roboto_Thin: ['Roboto_100Thin'],
        Roboto_ExtraLight: ['Roboto_200ExtraLight'],
        Roboto_Regular: ['Roboto_400Regular'],
        Roboto_SemiBold: ['Roboto_600SemiBold'],
        Roboto_Bold: ['Roboto_700Bold'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
    },
  },
};
