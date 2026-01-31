/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Xai Intelligence Workspace palette
        'deep-space': '#0B0F1A',
        'neon-blue': '#1F6BFF',
        'cyan-glow': '#00E5FF',
        'soft-purple': '#7B61FF',
        'light-silver': '#E6E9F0',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        xai: {
          "primary": "#1F6BFF",        // Neon Blue
          "secondary": "#7B61FF",      // Soft Purple
          "accent": "#00E5FF",         // Cyan Glow
          "neutral": "#0B0F1A",        // Deep Space Blue
          "base-100": "#0B0F1A",       // Deep Space Blue (main bg)
          "base-200": "#151B2A",       // Slightly lighter than deep space
          "base-300": "#1F2937",       // Even lighter for cards
          "base-content": "#E6E9F0",   // Light Silver (text)
          "info": "#00E5FF",           // Cyan Glow
          "success": "#00E5FF",        // Cyan Glow
          "warning": "#7B61FF",        // Soft Purple
          "error": "#FF6B6B",          // Error red
        },
      },
    ],
  },
}