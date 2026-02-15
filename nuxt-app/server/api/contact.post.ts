import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body || !body.message) {
    return { ok: false, error: 'missing fields' }
  }
  // Em produção: integrar com e-mail/third-party (SendGrid, Netlify Forms, etc.)
  console.log('contact form', body)
  return { ok: true }
})
