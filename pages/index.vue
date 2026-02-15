<template>
  <main class="relative w-full min-h-screen bg-void-black overflow-x-hidden">
    <!-- Hero Section - Immersive landing -->
    <Hero />

    <!-- Album Cube Section - 3D showcase -->
    <AlbumCube />

    <!-- Parallax Gallery Section -->
    <ParallaxGallery />

    <!-- Tour Schedule Section -->
    <TourSchedule />

    <!-- Footer Section -->
    <Footer />
  </main>
</template>

<script setup>
// GSAP and ScrollTrigger registration
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Set page metadata
useHead({
  title: 'Lucas Pereira | Desenvolvedor Full Stack & Tech Lead',
  meta: [
    { name: 'description', content: 'Portfólio de Lucas Pereira - Desenvolvedor Full Stack Pleno e Tech Lead especializado em React, Node.js, Python, Flutter e mais.' }
  ]
})
</script>
