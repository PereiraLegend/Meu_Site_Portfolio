// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700, 800],
      'JetBrains+Mono': [400, 500, 600, 700]
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Lucas Pereira | Desenvolvedor Full Stack & Tech Lead',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'description', content: 'Portfólio de Lucas Pereira - Desenvolvedor Full Stack Pleno e Tech Lead especializado em React, Node.js, Python, Flutter e mais.' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
