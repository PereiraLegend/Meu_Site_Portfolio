<template>
  <section class="max-w-6xl mx-auto px-6 py-12" id="Contatos">
    <h2 class="text-2xl font-bold">Contatos</h2>
    <div class="mt-6 flex gap-4 items-center">
      <a class="formatacao-link-contatos text-3xl text-green-500" href="#" aria-label="WhatsApp"><i class="fa-brands fa-square-whatsapp"></i></a>
      <a class="formatacao-link-contatos text-3xl text-blue-600" href="https://www.linkedin.com/in/lucas-pereira-1bb851201" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
      <a class="formatacao-link-contatos text-3xl text-gray-800" href="#" aria-label="Email"><i class="fa-solid fa-square-envelope"></i></a>
      <a class="formatacao-link-contatos text-3xl text-gray-800" href="https://github.com/PereiraLegend" aria-label="GitHub"><i class="fa-brands fa-square-github"></i></a>
    </div>

    <div class="mt-8 max-w-md">
      <form @submit.prevent="submit" class="grid gap-3">
        <input v-model="form.name" required placeholder="Seu nome" class="px-4 py-2 border rounded" />
        <input v-model="form.email" type="email" required placeholder="Seu email" class="px-4 py-2 border rounded" />
        <textarea v-model="form.message" rows="4" required placeholder="Mensagem" class="px-4 py-2 border rounded"></textarea>
        <div class="flex items-center gap-3">
          <button :disabled="sending" class="bg-brand text-white px-4 py-2 rounded">Enviar</button>
          <div v-if="status" class="text-sm text-green-600">{{ status }}</div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const form = ref({ name: '', email: '', message: '' })
const sending = ref(false)
const status = ref('')

async function submit() {
  sending.value = true
  status.value = ''
  try {
    const res = await $fetch('/api/contact', { method: 'POST', body: form.value })
    if ((res as any).ok) status.value = 'Mensagem enviada — obrigado!'
  } catch (err) {
    status.value = 'Erro ao enviar. Tente novamente.'
  } finally { sending.value = false }
}
</script>
