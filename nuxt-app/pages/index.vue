<template>
  <HeroSection />
  <SkillsSection />
  <HowWorkSection />
  <ProjectsCarousel />
  <ContactSection />
</template>

<script setup lang="ts">
import { useHead } from '#imports'
useHead({
  title: 'Lucas Pereira — Desenvolvedor Full Stack',
  meta: [
    { name: 'description', content: 'Portfólio de Lucas Pereira — Desenvolvedor Full Stack. Veja projetos, skills e formas de contato.' },
    { property: 'og:title', content: 'Lucas Pereira — Portfólio' },
    { property: 'og:description', content: 'Portfólio de Lucas Pereira — Desenvolvedor Full Stack.' },
    { property: 'og:image', content: '/MeuPortifólio/img/foto6.png' }
  ]
})

import HeroSection from '~/components/HeroSection.vue'
import SkillsSection from '~/components/SkillsSection.vue'
import HowWorkSection from '~/components/HowWorkSection.vue'
import ProjectsCarousel from '~/components/ProjectsCarousel.vue'
import ContactSection from '~/components/ContactSection.vue'
</script>
