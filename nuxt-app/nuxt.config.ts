// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '@/assets/css/tailwind.css',
    'node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  ],
  app: {
    head: {
      title: 'Lucas Pereira — Portfólio',
      meta: [
        { name: 'description', content: 'Portfólio de Lucas Pereira — Desenvolvedor Full Stack' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0ea5a1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Victor+Mono&display=swap' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      gaId: process.env.GA_ID || ''
    }
  }
})
