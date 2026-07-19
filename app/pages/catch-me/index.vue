<template>
  <div class="relative min-h-screen py-16 px-4 md:px-8 overflow-hidden flex flex-col justify-center">
    <!-- Grid Pattern Background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none brutal-grid-pattern z-0"></div>

    <main class="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-center">
      <SectionHead title="Get In Touch" tag="h1" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
      <div class="lg:col-span-5 flex flex-col space-y-6 text-center lg:text-left">
        <h3 class="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
          LET'S BUILD SOMETHING RUGGED & RELIABLE.
        </h3>
        <p class="text-lg font-bold uppercase tracking-tight text-brutal-black opacity-85">
          Drop me a line or find me on social media. Open for full-time opportunities or consulting work.
        </p>
        <div v-if="profile" class="flex flex-col space-y-4 pt-4 items-center lg:items-start">
          <a :href="`mailto:${profile.meta.email}`" class=" sm:text-xl md:text-2xl font-black uppercase hover:underline flex items-center justify-center lg:justify-start gap-3 break-all w-full max-w-full">
            <Icon name="lucide:mail" class="w-8 h-8 shrink-0" />
            {{ profile.meta.email }}
          </a>
          <div class="grid grid-cols-4 gap-4 w-full max-w-sm">
            <BrutalistBtn v-if="profile.meta.github" :to="profile.meta.github" color="white" size="sm" aria-label="GitHub Profile" class="flex items-center justify-center p-3">
              <Icon name="lucide:github" class="w-6 h-6" />
            </BrutalistBtn>
            <BrutalistBtn v-if="profile.meta.linkedin" :to="profile.meta.linkedin" color="white" size="sm" aria-label="LinkedIn Profile" class="flex items-center justify-center p-3">
              <Icon name="lucide:linkedin" class="w-6 h-6" />
            </BrutalistBtn>
            <BrutalistBtn v-if="profile.meta.whatsapp" :to="profile.meta.whatsapp" color="white" size="sm" aria-label="WhatsApp Contact" class="flex items-center justify-center p-3">
              <Icon name="lucide:message-circle" class="w-6 h-6" />
            </BrutalistBtn>
            <BrutalistBtn v-if="profile.meta.instagram" :to="profile.meta.instagram" color="white" size="sm" aria-label="Instagram Profile" class="flex items-center justify-center p-3">
              <Icon name="lucide:instagram" class="w-6 h-6" />
            </BrutalistBtn>
          </div>
          <div class="w-full max-w-sm pt-2">
            <BrutalistBtn color="yellow" class="w-full text-center" @click="isCvModalOpen = true">
              Download CV
            </BrutalistBtn>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-7">
        <BrutalistCard color="white" class="p-6 md:p-8">
          <form class="flex flex-col space-y-6" @submit.prevent="handleSubmit">
            <input type="hidden" name="access_key" value="8855b402-787a-4846-b831-2c8443328136">
            
            <div class="flex flex-col space-y-2">
              <label class="font-black uppercase tracking-wider text-sm">Your Name</label>
              <input 
                v-model="formData.name"
                name="name"
                type="text" 
                placeholder="JOHN DOE" 
                class="w-full p-4 border-3 border-brutal-black font-bold uppercase placeholder-zinc-400 focus:outline-none focus:bg-brutal-cream disabled:opacity-50"
                required
                :disabled="isSubmitting"
              >
            </div>
            
            <div class="flex flex-col space-y-2">
              <label class="font-black uppercase tracking-wider text-sm">Your Email</label>
              <input 
                v-model="formData.email"
                name="email"
                type="email" 
                placeholder="JOHN@EXAMPLE.COM" 
                class="w-full p-4 border-3 border-brutal-black font-bold uppercase placeholder-zinc-400 focus:outline-none focus:bg-brutal-cream disabled:opacity-50"
                required
                :disabled="isSubmitting"
              >
            </div>

            <div class="flex flex-col space-y-2">
              <label class="font-black uppercase tracking-wider text-sm">Your Message</label>
              <textarea 
                v-model="formData.message"
                name="message"
                rows="4" 
                placeholder="I HAVE AN EXCITING PROJECT FOR YOU..." 
                class="w-full p-4 border-3 border-brutal-black font-bold uppercase placeholder-zinc-400 focus:outline-none focus:bg-brutal-cream resize-none disabled:opacity-50"
                required
                :disabled="isSubmitting"
              ></textarea>
            </div>

            <div class="h-captcha" data-captcha="true"></div>

            <div>
              <BrutalistBtn type="submit" color="yellow" class="w-full" :disabled="isSubmitting">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </BrutalistBtn>
            </div>
          </form>
        </BrutalistCard>
      </div>
      </div>
    </main>

    <!-- CV Modal -->
    <CvModal :is-open="isCvModalOpen" @close="isCvModalOpen = false" />

    <!-- Status Alert Modal -->
    <StatusModal 
      :is-open="statusModal.isOpen" 
      :status="statusModal.status" 
      :message="statusModal.message" 
      @close="statusModal.isOpen = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

useSeoMeta({
  title: 'Get In Touch',
  ogTitle: 'Contact & Hire | Farhan Alwanda',
  ogDescription: 'Get in touch with Farhan Alwanda. Open for full-time opportunities, projects, or consulting.'
})

useHead({
  script: [
    { src: 'https://web3forms.com/client/script.js', async: true, defer: true }
  ]
})

const { data: profile } = await useAsyncData('profile', () => queryCollection('profile').first())

const isCvModalOpen = ref(false)

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const statusModal = reactive({
  isOpen: false,
  status: 'success' as 'success' | 'error',
  message: ''
})

const handleSubmit = async (e: Event) => {
  // Rate limiting check using localStorage
  const lastSubmitTime = localStorage.getItem('last_submit_time')
  const cooldown = 60 * 1000 // 1 minute cooldown
  
  if (lastSubmitTime) {
    const timePassed = Date.now() - parseInt(lastSubmitTime, 10)
    if (timePassed < cooldown) {
      const secondsLeft = Math.ceil((cooldown - timePassed) / 1000)
      statusModal.status = 'error'
      statusModal.message = `Rate limit exceeded. Please wait ${secondsLeft}s before sending another message.`
      statusModal.isOpen = true
      return
    }
  }

  const form = e.target as HTMLFormElement
  const data = new FormData(form)

  // Explicitly add hCaptcha response if it exists in the DOM
  const hcaptchaResponse = (window as any).hcaptcha?.getResponse()
  if (!hcaptchaResponse) {
    statusModal.status = 'error'
    statusModal.message = 'Please complete the captcha verification first.'
    statusModal.isOpen = true
    return
  }
  
  data.set('h-captcha-response', hcaptchaResponse)

  isSubmitting.value = true

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    })

    const result = await response.json()

    if (response.ok && result.success) {
      statusModal.status = 'success'
      statusModal.message = result.message || 'Your message has been sent successfully!'
      statusModal.isOpen = true
      
      // Save last submit time to rate limit
      localStorage.setItem('last_submit_time', Date.now().toString())

      // Reset form fields
      formData.name = ''
      formData.email = ''
      formData.message = ''
      
      // Reset hcaptcha widget if available
      if ((window as any).hcaptcha) {
        ;(window as any).hcaptcha.reset()
      }
    } else {
      statusModal.status = 'error'
      // Handle potential spam detection status code / messages from Web3Forms
      if (response.status === 429 || result.message?.toLowerCase().includes('spam') || result.message?.toLowerCase().includes('bot')) {
        statusModal.message = 'Submission rejected as spam. Please verify captcha and try again.'
      } else {
        statusModal.message = result.message || 'Something went wrong. Please try again.'
      }
      statusModal.isOpen = true
    }
  } catch (error) {
    statusModal.status = 'error'
    statusModal.message = 'Network error. Please check your connection and try again.'
    statusModal.isOpen = true
  } finally {
    isSubmitting.value = false
  }
}
</script>
