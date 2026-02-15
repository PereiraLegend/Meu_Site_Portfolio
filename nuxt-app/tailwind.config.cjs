module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts,vue}',
    './app.vue',
    './composables/**/*.{js,ts}',
    './public/MeuPortifólio/**/*.{html,js,css}'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0ea5a1',
        accent: '#ff7a59'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Victor Mono', 'ui-monospace', 'SFMono-Regular']
      }
    }
  },
  plugins: []
}
