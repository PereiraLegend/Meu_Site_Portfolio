<template>
  <SiteHeader />
  <main class="min-h-screen">
    <NuxtPage />
  </main>
  <SiteFooter />
  <BackToTop />
</template>

<script setup lang="ts">
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import BackToTop from '~/components/BackToTop.vue'
</script>
