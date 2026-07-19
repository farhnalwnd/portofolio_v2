export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV !== 'production') return

  const gaId = 'G-GZDNV5F0T3'

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
        async: true
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `,
        type: 'text/javascript'
      }
    ]
  })
})
