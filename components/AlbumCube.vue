<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { albumCubeConfig } from '~/composables/useConfig'

gsap.registerPlugin(ScrollTrigger)

// Null check: if config is empty, do not render
const shouldRender = computed(() => {
  return albumCubeConfig.albums.length > 0 && albumCubeConfig.cubeTextures.length > 0
})

const sectionRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const rotationProgress = ref(0)
const currentAlbumIndex = ref(0)
const blurAmount = ref(0)
const letterSpacing = ref(0)

let scrollTriggerInstance: ScrollTrigger | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let cube: THREE.Mesh | null = null
let animationId: number | null = null

const currentAlbum = computed(() => albumCubeConfig.albums[currentAlbumIndex.value])

onMounted(async () => {
  if (!shouldRender.value || !sectionRef.value || !canvasRef.value) return

  // Initialize Three.js
  initThreeJS()

  // Create ScrollTrigger
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top top',
    end: '+=300%',
    scrub: 1,
    pin: true,
    onUpdate: (self) => {
      const progress = self.progress
      rotationProgress.value = progress

      // Calculate current album index
      const albumIndex = Math.min(
        Math.floor(progress * 4),
        albumCubeConfig.albums.length - 1
      )
      currentAlbumIndex.value = albumIndex

      // Velocity-based blur effect
      const velocity = Math.abs(self.getVelocity())
      const targetBlur = Math.min(velocity / 500, 8)
      const targetSpacing = Math.min(velocity / 100, 30)

      blurAmount.value = blurAmount.value + (targetBlur - blurAmount.value) * 0.2
      letterSpacing.value = letterSpacing.value + (targetSpacing - letterSpacing.value) * 0.2
    },
  })
})

onUnmounted(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
})

const initThreeJS = async () => {
  if (!canvasRef.value) return

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 6

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Load textures
  const textureLoader = new THREE.TextureLoader()
  const textures: THREE.Texture[] = []

  for (const texturePath of albumCubeConfig.cubeTextures) {
    try {
      const texture = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(texturePath, resolve, undefined, reject)
      })
      textures.push(texture)
    } catch (e) {
      // Create a colored texture as fallback
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, 512, 512)
      const fallbackTexture = new THREE.CanvasTexture(canvas)
      textures.push(fallbackTexture)
    }
  }

  // Create cube with materials
  const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)
  const materials = textures.map(texture =>
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.2,
      metalness: 0.1
    })
  )

  // Fill remaining faces with the last texture if needed
  while (materials.length < 6) {
    materials.push(materials[materials.length - 1] || new THREE.MeshStandardMaterial({ color: 0x1a1a2e }))
  }

  cube = new THREE.Mesh(geometry, materials)
  scene.add(cube)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  const spotLight1 = new THREE.SpotLight(0xffffff, 1)
  spotLight1.position.set(10, 10, 10)
  spotLight1.angle = 0.15
  spotLight1.penumbra = 1
  spotLight1.castShadow = true
  scene.add(spotLight1)

  const spotLight2 = new THREE.SpotLight(0x9DC4FF, 0.5)
  spotLight2.position.set(-10, -10, -10)
  spotLight2.angle = 0.15
  spotLight2.penumbra = 1
  scene.add(spotLight2)

  const pointLight = new THREE.PointLight(0x00D4FF, 0.5)
  pointLight.position.set(0, 0, 5)
  scene.add(pointLight)

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)

    if (cube) {
      // Map rotation progress (0-1) to rotation angles
      const targetRotationY = rotationProgress.value * Math.PI * 2
      const targetRotationX = Math.sin(rotationProgress.value * Math.PI) * 0.3

      // Smooth interpolation
      cube.rotation.y = THREE.MathUtils.lerp(cube.rotation.y, targetRotationY, 0.1)
      cube.rotation.x = THREE.MathUtils.lerp(cube.rotation.x, targetRotationX, 0.1)
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  }

  animate()

  // Handle resize
  const handleResize = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
}
</script>

<template>
  <section
    v-if="shouldRender"
    id="albums"
    ref="sectionRef"
    class="relative w-full h-screen bg-void-black overflow-hidden"
  >
    <!-- Background title with blur effect -->
    <div
      ref="titleRef"
      class="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      :style="{
        filter: `blur(${blurAmount}px)`,
        letterSpacing: `${letterSpacing}px`,
      }"
    >
      <h2 class="font-display text-[20vw] text-white/5 uppercase whitespace-nowrap select-none">
        {{ currentAlbum?.subtitle }}
      </h2>
    </div>

    <!-- 3D Canvas -->
    <div class="absolute inset-0 z-10">
      <canvas ref="canvasRef" class="w-full h-full" />
    </div>

    <!-- Album info overlay -->
    <div class="absolute bottom-12 left-12 z-20">
      <p class="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
        Album {{ String(currentAlbum?.id || 1).padStart(2, '0') }} / {{ String(albumCubeConfig.albums.length).padStart(2, '0') }}
      </p>
      <h3 class="font-display text-5xl md:text-7xl text-white mb-2 transition-all duration-300">
        {{ currentAlbum?.title }}
      </h3>
      <p class="font-mono-custom text-sm text-white/50">
        {{ currentAlbum?.subtitle }}
      </p>
    </div>

    <!-- Progress indicator -->
    <div class="absolute right-12 top-1/2 -translate-y-1/2 z-20">
      <div class="flex flex-col gap-3">
        <div
          v-for="(album, index) in albumCubeConfig.albums"
          :key="album.id"
          :class="`w-2 rounded-full transition-all duration-300 ${
            index === currentAlbumIndex
              ? 'bg-neon-cyan h-8'
              : 'bg-white/20 h-2'
          }`"
        />
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-12 right-12 z-20">
      <p class="font-mono-custom text-xs text-white/40 uppercase tracking-wider">
        {{ albumCubeConfig.scrollHint }}
      </p>
    </div>

    <!-- Decorative corner lines -->
    <div class="absolute top-12 left-12 w-20 h-px bg-gradient-to-r from-neon-cyan/50 to-transparent" />
    <div class="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
  </section>
</template>
