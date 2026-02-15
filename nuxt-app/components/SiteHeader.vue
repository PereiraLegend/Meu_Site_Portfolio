<template>
  <header class="bg-white/70 backdrop-blur sticky top-0 z-40 shadow-sm">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#" class="text-lg md:text-xl font-extrabold tracking-tight">
        <span class="text-brand">LUCAS</span> PEREIRA
      </a>

      <nav class="hidden md:flex gap-8 items-center text-sm font-medium text-gray-700">
        <a href="#Sobre" class="hover:text-brand transition">Sobre</a>
        <a href="#Projetos" class="hover:text-brand transition">Meus Projetos</a>
        <a href="#Contatos" class="hover:text-brand transition">Contatos</a>
      </nav>

      <div class="md:hidden">
        <button @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Abrir menu" class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand">
          <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
        </button>
      </div>
    </div>

    <transition name="fade-slide">
      <div v-if="menuOpen" class="md:hidden bg-white/95 border-t">
        <nav class="flex flex-col gap-2 p-4 text-base">
          <a @click="menuOpen=false" href="#Sobre" class="py-2">Sobre</a>
          <a @click="menuOpen=false" href="#Projetos" class="py-2">Meus Projetos</a>
          <a @click="menuOpen=false" href="#Contatos" class="py-2">Contatos</a>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all .2s ease; }
.fade-slide-enter-from { transform: translateY(-6px); opacity: 0 }
.fade-slide-enter-to { transform: translateY(0); opacity: 1 }
</style>
