<template>
  <section class="max-w-6xl mx-auto px-6 py-12" id="Projetos">
    <div class="flex flex-col md:flex-row gap-8 items-center">
      <div class="w-full md:w-2/3">
        <div class="relative">
          <div class="overflow-hidden rounded-lg">
            <div class="flex transition-transform duration-500" :style="`transform: translateX(-${currentIndex * (100 / visibleCount)}%)`">
              <div v-for="(img, i) in imagesList" :key="i" class="flex-shrink-0 w-full md:w-1/3 px-2">
                <img :src="img" class="w-full h-48 object-cover rounded-md shadow-sm" alt="projeto" />
              </div>
            </div>
          </div>
          <button @click="prev" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"><i class="fa-solid fa-chevron-left"></i></button>
          <button @click="next" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="w-full md:w-1/3">
        <h2 class="text-2xl font-bold">Meus Projetos</h2>
        <p class="mt-3 text-gray-600">Veja meus trabalhos finalizados e em andamento no GitHub.</p>
        <div class="mt-4">
          <a class="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded" href="https://github.com/PereiraLegend/My_Public_Projects/tree/main"><i class="fa-brands fa-github"></i> Acessar GitHub</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
const imagesList = [
  '/MeuPortifólio/img/Calculadora-JS.png',
  '/MeuPortifólio/img/Gerador-arquivos.png',
  '/MeuPortifólio/img/PongC2.png',
  '/MeuPortifólio/img/Jogos-Python.png',
  '/MeuPortifólio/img/Sistema-Bibliotecario.jpeg',
  '/MeuPortifólio/img/Site-Portifolio.png',
  '/MeuPortifólio/img/Pong-C.png'
]

const currentIndex = ref(0)
const visibleCount = 3
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % Math.max(1, imagesList.length - visibleCount + 1)
}
function prev() {
  currentIndex.value = (currentIndex.value - 1 + Math.max(1, imagesList.length - visibleCount + 1)) % Math.max(1, imagesList.length - visibleCount + 1)
}

onMounted(() => {
  timer = setInterval(next, 3500)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
</script>
