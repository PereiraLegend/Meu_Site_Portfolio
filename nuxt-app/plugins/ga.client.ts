export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const id = config.public.gaId
  if (!id) return
  // inject GA4 script
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(s)
  ;(window as any).dataLayer = (window as any).dataLayer || []
  function gtag(){(window as any).dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', id)
})
