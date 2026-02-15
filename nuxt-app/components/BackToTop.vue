<template>
  <button v-show="visible" @click="scrollTop" id="back-to-top-btn" class="fixed right-6 bottom-6 bg-brand text-white p-3 rounded-full shadow-lg hover:scale-105 transition-opacity opacity-95" aria-label="Voltar ao topo">
    <i class="fa-solid fa-angles-up fa-shake"></i>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 300
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
