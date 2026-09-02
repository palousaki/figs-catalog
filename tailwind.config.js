/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Farmhouse-editorial brand palette — warm terracotta, ink, olive, fig
        // Usage: bg-brand, text-brand, border-brand, focus:ring-brand
        brand: {
          DEFAULT: 'oklch(56% 0.13 45)',    // terracotta — primary buttons, links, accents
          hover:   'oklch(42% 0.12 42)',    // deeper terracotta — hover states
          dark:    'oklch(24% 0.02 55)',    // ink — dark bands, CTA banner background
          light:   'oklch(94.5% 0.018 82)', // parchment card tint — subtle backgrounds, badges
          muted:   'oklch(98% 0.008 85)',   // near-white cream — very light tint backgrounds
        },
        // Ink — primary text color, with a softer variant for body copy
        ink: {
          DEFAULT: 'oklch(24% 0.02 55)',
          soft: 'oklch(46% 0.028 58)',
        },
        olive: 'oklch(46% 0.08 135)',    // secondary accent — provenance/trust icons
        fig: 'oklch(32% 0.09 322)',      // tertiary accent — fig-cut mark, certification
        parchment: 'oklch(97% 0.015 85)', // main page background
        line: 'oklch(86% 0.018 75)',      // hairline borders
      },
      fontFamily: {
        // Inter — clean sans-serif for body text and UI (Work Sans/Karla dropped: no Greek subset)
        sans:   ['var(--font-work-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        // Instrument Serif — editorial display serif for headings
        serif:  ['var(--font-instrument-serif)', 'Georgia', 'Times New Roman', 'serif'],
        // Caveat — hand-written accent, used sparingly for stamps/labels
        script: ['var(--font-caveat)', 'cursive'],
      },
    },
  },
  plugins: [],
};
