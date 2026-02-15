<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Ticket, ArrowRight } from 'lucide-vue-next'
import { parallaxGalleryConfig } from '~/composables/useConfig'

gsap.registerPlugin(ScrollTrigger)

// Null check: if config is empty, do not render
const shouldRender = computed(() => {
  return parallaxGalleryConfig.parallaxImagesTop.length > 0 ||
    parallaxGalleryConfig.galleryImages.length > 0 ||
    parallaxGalleryConfig.sectionTitle
})

const sectionRef = ref<HTMLDivElement | null>(null)
const parallaxContainerRef = ref<HTMLDivElement | null>(null)
const topRowRef = ref<HTMLDivElement | null>(null)
const bottomRowRef = ref<HTMLDivElement | null>(null)
const galleryRef = ref<HTMLDivElement | null>(null)
const galleryTrackRef = ref<HTMLDivElement | null>(null)

const scrollTriggerRefs = ref<ScrollTrigger[]>([])

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    // Parallax strips animation
    if (topRowRef.value && bottomRowRef.value) {
      const st1 = ScrollTrigger.create({
        trigger: parallaxContainerRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          if (topRowRef.value) {
            gsap.set(topRowRef.value, {
              x: -progress * 300,
            })
          }
          if (bottomRowRef.value) {
            gsap.set(bottomRowRef.value, {
              x: progress * 300 - 150,
            })
          }
        },
      })
      scrollTriggerRefs.value.push(st1)
    }

    // Horizontal gallery scroll
    if (galleryRef.value && galleryTrackRef.value) {
      const trackWidth = galleryTrackRef.value.scrollWidth
      const viewportWidth = window.innerWidth

      const st2 = ScrollTrigger.create({
        trigger: galleryRef.value,
        start: 'top top',
        end: () => `+=${trackWidth - viewportWidth}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (galleryTrackRef.value) {
            const x = -self.progress * (trackWidth - viewportWidth)
            gsap.set(galleryTrackRef.value, { x })
          }
        },
      })
      scrollTriggerRefs.value.push(st2)
    }
  }, sectionRef.value || undefined)

  onUnmounted(() => {
    ctx.revert()
    scrollTriggerRefs.value.forEach(st => st.kill())
    scrollTriggerRefs.value = []
  })
})

const scrollToTour = () => {
  const tourSection = document.getElementById('tour')
  if (tourSection) {
    tourSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    v-if="shouldRender"
    id="gallery"
    ref="sectionRef"
    class="relative w-full bg-void-black"
  >
    <!-- Parallax Strips Section -->
    <div
      ref="parallaxContainerRef"
      class="relative py-20 overflow-hidden"
    >
      <!-- Section header -->
      <div class="px-12 mb-12">
        <p class="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
          {{ parallaxGalleryConfig.sectionLabel }}
        </p>
        <h2 class="font-display text-4xl md:text-5xl text-white">
          {{ parallaxGalleryConfig.sectionTitle }}
        </h2>
      </div>

      <!-- Top row - moves left -->
      <div
        ref="topRowRef"
        class="flex gap-4 mb-4 will-change-transform"
      >
        <div
          v-for="image in parallaxGalleryConfig.parallaxImagesTop"
          :key="image.id"
          class="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden rounded-lg image-hover-scale"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
        </div>
      </div>

      <!-- Bottom row - moves right -->
      <div
        ref="bottomRowRef"
        class="flex gap-4 will-change-transform"
        style="transform: translateX(-150px)"
      >
        <div
          v-for="image in parallaxGalleryConfig.parallaxImagesBottom"
          :key="image.id"
          class="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden rounded-lg image-hover-scale"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
        </div>
      </div>
    </div>

    <!-- Marquee Section -->
    <div class="relative py-8 bg-void-dark overflow-hidden border-y border-white/5">
      <div class="animate-marquee flex whitespace-nowrap">
        <span
          v-for="i in 8"
          :key="i"
          class="flex items-center gap-8 mx-8 text-2xl font-display text-white/20"
        >
          <span v-for="(text, j) in parallaxGalleryConfig.marqueeTexts" :key="j">{{ text }}</span>
          <Ticket class="w-6 h-6" />
          <ArrowRight class="w-6 h-6" />
        </span>
      </div>
    </div>

    <!-- Horizontal Gallery Section -->
    <div
      ref="galleryRef"
      class="relative h-screen overflow-hidden"
    >
      <!-- Gallery header -->
      <div class="absolute top-12 left-12 z-20">
        <p class="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
          {{ parallaxGalleryConfig.galleryLabel }}
        </p>
        <h2 class="font-display text-4xl md:text-5xl text-white">
          {{ parallaxGalleryConfig.galleryTitle }}
        </h2>
      </div>

      <!-- Horizontal scrolling track -->
      <div
        ref="galleryTrackRef"
        class="flex items-center gap-8 h-full px-12 pt-24 will-change-transform"
      >
        <div
          v-for="(image, index) in parallaxGalleryConfig.galleryImages"
          :key="image.id"
          class="relative flex-shrink-0 group cursor-pointer"
          :style="{ marginTop: index % 2 === 0 ? '0' : '60px' }"
        >
          <div class="relative w-[450px] h-[300px] overflow-hidden rounded-xl">
            <img
              :src="image.src"
              :alt="image.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-void-black/80 via-transparent to-transparent" />

            <!-- Image info -->
            <div class="absolute bottom-6 left-6">
              <p class="font-mono-custom text-xs text-neon-soft/80 mb-1">
                {{ image.date }}
              </p>
              <h3 class="font-display text-2xl text-white">
                {{ image.title }}
              </h3>
            </div>

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/10 transition-colors duration-300" />
          </div>

          <!-- Index number -->
          <div class="absolute -top-8 -left-4 font-mono-custom text-7xl text-white/5 font-bold">
            {{ String(index + 1).padStart(2, '0') }}
          </div>
        </div>

        <!-- End CTA -->
        <div class="flex-shrink-0 flex flex-col items-center justify-center w-[300px] h-[300px]">
          <button
            @click="scrollToTour"
            class="group flex flex-col items-center gap-4 text-white hover:text-neon-cyan transition-colors"
          >
            <div class="w-20 h-20 rounded-full border border-white/20 group-hover:border-neon-cyan flex items-center justify-center transition-colors">
              <ArrowRight class="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </div>
            <span class="font-display text-lg uppercase tracking-wider">
              {{ parallaxGalleryConfig.endCtaText }}
            </span>
          </button>
        </div>
      </div>

      <!-- Scroll progress indicator -->
      <div class="absolute bottom-12 left-12 right-12 h-px bg-white/10">
        <div class="h-full bg-neon-cyan/50 w-0" id="gallery-progress" />
      </div>
    </div>
  </section>
</template>
