/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#07080a',
        surface: {
          DEFAULT: '#0d0d0d',
          elevated: '#101111',
          card: '#121212',
        },
        hairline: {
          DEFAULT: '#242728',
          soft: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.16)',
        },
        ink: '#f4f4f6',
        body: '#cdcdcd',
        charcoal: '#d3d3d4',
        mute: '#9c9c9d',
        ash: '#6a6b6c',
        stone: '#434345',
        'on-dark': {
          DEFAULT: '#ffffff',
          mute: 'rgba(255,255,255,0.72)',
        },
        'accent-cyan': {
          DEFAULT: '#00E5FF',
          soft: 'rgba(0,229,255,0.15)',
        },
        'accent-green': {
          DEFAULT: '#22C55E',
          soft: 'rgba(34,197,94,0.15)',
        },
        'accent-amber': {
          DEFAULT: '#F59E0B',
          soft: 'rgba(245,158,11,0.15)',
        },
        'accent-red': {
          DEFAULT: '#EF4444',
          soft: 'rgba(239,68,68,0.15)',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary-shadcn))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted-shadcn))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-shadcn))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '1.1', fontWeight: '600', letterSpacing: '0' }],
        'display-lg': ['56px', { lineHeight: '1.17', fontWeight: '500', letterSpacing: '0.2px' }],
        'heading-xl': ['24px', { lineHeight: '1.6', fontWeight: '500', letterSpacing: '0.2px' }],
        'heading-lg': ['22px', { lineHeight: '1.15', fontWeight: '500', letterSpacing: '0' }],
        'heading-md': ['20px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.2px' }],
        'heading-sm': ['18px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.2px' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
        'body-strong': ['16px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.2px' }],
        'body-sm': ['14px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
        'body-sm-strong': ['14px', { lineHeight: '1.6', fontWeight: '500', letterSpacing: '0.2px' }],
        'caption-md': ['13px', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0.1px' }],
        'caption-sm': ['12px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0.4px' }],
        'button-md': ['14px', { lineHeight: '1.6', fontWeight: '500', letterSpacing: '0.2px' }],
      },
      borderRadius: {
        none: '0px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '16px',
        full: '9999px',
      },
      spacing: {
        'xxs': '2px',
        'xs': '4px',
        'section': '96px',
      },
      maxWidth: {
        'content': '1240px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in": "fade-in 600ms ease-out forwards",
        "fade-in-up": "fade-in-up 600ms ease-out forwards",
        "slide-in-left": "slide-in-left 300ms ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
