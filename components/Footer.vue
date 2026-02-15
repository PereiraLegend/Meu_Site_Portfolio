<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Twitter, Youtube, Music2, Mail, Phone, MapPin, ExternalLink } from 'lucide-vue-next'
import { footerConfig } from '~/composables/useConfig'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL_ICON_MAP = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  music: Music2,
}

// Null check: if config is empty, do not render
const shouldRender = computed(() => {
  return footerConfig.brandName && footerConfig.heroTitle && footerConfig.socialLinks.length > 0
})

const sectionRef = ref<HTMLDivElement | null>(null)
const portraitRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLDivElement | null>(null)
const hoveredImage = ref<number | null>(null)

const scrollTriggerRefs = ref<ScrollTrigger[]>([])

onMounted(() => {
  if (!sectionRef.value) return

  const ctx = gsap.context(() => {
    // Parallax title effect
    if (titleRef.value && portraitRef.value) {
      const st = ScrollTrigger.create({
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          if (titleRef.value) {
            // Title moves faster than portrait
            gsap.set(titleRef.value, {
              y: -self.progress * 100,
            })
          }
        },
      })
      scrollTriggerRefs.value.push(st)
    }
  }, sectionRef.value || undefined)

  onUnmounted(() => {
    ctx.revert()
    scrollTriggerRefs.value.forEach(st => st.kill())
    scrollTriggerRefs.value = []
  })
})

const handleContactClick = () => {
  if (footerConfig.subscribeAlertMessage) {
    alert(footerConfig.subscribeAlertMessage)
  }
}
</script>

<template>
  <section
    v-if="shouldRender"
    id="contact"
    ref="sectionRef"
    class="relative w-full bg-void-black overflow-hidden"
  >
    <!-- Artist portrait section -->
    <div class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background portrait -->
      <div
        ref="portraitRef"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div class="relative w-full max-w-2xl aspect-[2/3] mx-auto">
          <img
            :src="footerConfig.portraitImage"
            :alt="footerConfig.portraitAlt"
            class="w-full h-full object-cover"
          />
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/30 to-transparent" />
          <div class="absolute inset-0 bg-gradient-to-b from-void-black via-transparent to-transparent opacity-50" />
        </div>
      </div>

      <!-- Parallax title overlay -->
      <div
        ref="titleRef"
        class="relative z-10 text-center will-change-transform"
      >
        <h2 class="font-display text-[15vw] text-white leading-none tracking-tighter">
          {{ footerConfig.heroTitle }}
        </h2>
        <p class="font-mono-custom text-lg text-neon-soft/60 uppercase tracking-[0.5em] mt-4">
          {{ footerConfig.heroSubtitle }}
        </p>
      </div>

      <!-- Artist name -->
      <div class="absolute bottom-20 left-12 z-20">
        <p class="font-mono-custom text-xs text-white/40 uppercase tracking-wider mb-2">
          {{ footerConfig.artistLabel }}
        </p>
        <h3 class="font-display text-4xl text-white">{{ footerConfig.artistName }}</h3>
        <p class="font-mono-custom text-sm text-neon-soft/60">{{ footerConfig.artistSubtitle }}</p>
      </div>
    </div>

    <!-- Footer content -->
    <div class="relative bg-void-black py-20 px-6 md:px-12">
      <!-- Top divider -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div class="max-w-7xl mx-auto">
        <!-- Footer grid - Main content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                <Music2 class="w-5 h-5 text-neon-cyan" />
              </div>
              <span class="font-display text-2xl text-white">{{ footerConfig.brandName }}</span>
            </div>
            <p class="text-sm text-white/50 leading-relaxed mb-6">
              {{ footerConfig.brandDescription }}
            </p>
            <!-- Social links -->
            <div class="flex gap-4">
              <a
                v-for="social in footerConfig.socialLinks"
                :key="social.label"
                :href="social.href"
                class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                :aria-label="social.label"
              >
                <component :is="SOCIAL_ICON_MAP[social.icon]" class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-display text-sm uppercase tracking-wider text-white mb-6">
              {{ footerConfig.quickLinksTitle }}
            </h4>
            <ul class="space-y-3">
              <li v-for="link in footerConfig.quickLinks" :key="link">
                <a
                  href="#"
                  class="text-sm text-white/50 hover:text-neon-soft transition-colors flex items-center gap-2 group"
                >
                  <span>{{ link }}</span>
                  <ExternalLink class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-display text-sm uppercase tracking-wider text-white mb-6">
              {{ footerConfig.contactTitle }}
            </h4>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Mail class="w-4 h-4 text-neon-soft/60 mt-0.5" />
                <div>
                  <p class="text-sm text-white/50">{{ footerConfig.emailLabel }}</p>
                  <a :href="`mailto:${footerConfig.email}`" class="text-sm text-white hover:text-neon-soft transition-colors">
                    {{ footerConfig.email }}
                  </a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Phone class="w-4 h-4 text-neon-soft/60 mt-0.5" />
                <div>
                  <p class="text-sm text-white/50">{{ footerConfig.phoneLabel }}</p>
                  <span class="text-sm text-white">{{ footerConfig.phone }}</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <MapPin class="w-4 h-4 text-neon-soft/60 mt-0.5" />
                <div>
                  <p class="text-sm text-white/50">{{ footerConfig.addressLabel }}</p>
                  <span class="text-sm text-white">{{ footerConfig.address }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h4 class="font-display text-sm uppercase tracking-wider text-white mb-6">
              {{ footerConfig.newsletterTitle }}
            </h4>
            <p class="text-sm text-white/50 mb-4">
              {{ footerConfig.newsletterDescription }}
            </p>
            <div class="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                class="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-cyan/50"
              />
              <button
                @click="handleContactClick"
                class="px-4 py-3 bg-neon-cyan/20 text-neon-cyan rounded-lg text-sm font-medium hover:bg-neon-cyan/30 transition-colors"
              >
                {{ footerConfig.newsletterButtonText }}
              </button>
            </div>
          </div>
        </div>

        <!-- Footer image grid -->
        <div v-if="footerConfig.galleryImages.length > 0" class="mb-12">
          <p class="font-mono-custom text-xs text-white/30 uppercase tracking-wider mb-4">
            Gallery
          </p>
          <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
            <div
              v-for="(image, index) in footerConfig.galleryImages"
              :key="image.id"
              class="relative aspect-square overflow-hidden rounded-lg footer-grid-item cursor-pointer"
              @mouseenter="hoveredImage = index"
              @mouseleave="hoveredImage = null"
            >
              <img
                :src="image.src"
                alt=""
                :class="`w-full h-full object-cover transition-all duration-300 ${
                  hoveredImage === index ? 'scale-110 brightness-110' : 'brightness-75'
                }`"
              />
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-white/30 font-mono-custom">
            {{ footerConfig.copyrightText }}
          </p>
          <div class="flex gap-6">
            <a v-for="link in footerConfig.bottomLinks" :key="link" href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">
              {{ link }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
