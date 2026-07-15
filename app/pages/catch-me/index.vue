<template>
  <div class="w-full min-h-screen bg-brutal-cream flex flex-col">
    <TheNavbar />
    
    <main class="flex-grow max-w-7xl mx-auto w-full py-16 px-4 md:px-8 flex flex-col justify-center">
      <SectionHead title="Get In Touch" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        <div class="lg:col-span-5 flex flex-col space-y-6">
          <h3 class="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            LET'S BUILD SOMETHING RUGGED & RELIABLE.
          </h3>
          <p class="text-lg font-bold uppercase tracking-tight text-brutal-black opacity-85">
            Drop me a line or find me on Github/LinkedIn. Open for full-time opportunities or consulting work.
          </p>
          
          <div class="flex flex-col space-y-4 pt-4">
            <a href="mailto:hello@devportfolio.com" class="text-2xl font-black uppercase hover:underline flex items-center gap-3">
              <Icon name="lucide:mail" class="w-8 h-8" />
              hello@devportfolio.com
            </a>
            <div class="flex items-center space-x-4">
              <BrutalistBtn to="https://github.com/anomalyco/opencode" color="black" size="sm" class="flex-grow">
                Github
              </BrutalistBtn>
              <BrutalistBtn to="https://linkedin.com" color="white" size="sm" class="flex-grow">
                LinkedIn
              </BrutalistBtn>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-7">
          <BrutalistCard color="white" class="p-6 md:p-8">
            <form class="flex flex-col space-y-6" @submit.prevent>
              <div class="flex flex-col space-y-2">
                <label class="font-black uppercase tracking-wider text-sm">Your Name</label>
                <input 
                  type="text" 
                  placeholder="JOHN DOE" 
                  class="w-full p-4 border-3 border-brutal-black font-bold uppercase placeholder-zinc-400 focus:outline-none focus:bg-brutal-cream"
                  required
                >
              </div>
              
              <div class="flex flex-col space-y-2">
                <label class="font-black uppercase tracking-wider text-sm">Your Email</label>
                <input 
                  type="email" 
                  placeholder="JOHN@EXAMPLE.COM" 
                  class="w-full p-4 border-3 border-brutal-black font-bold uppercase placeholder-zinc-400 focus:outline-none focus:bg-brutal-cream"
                  required
                >
              </div>

              <div class="flex flex-col space-y-2">
                <label class="font-black uppercase tracking-wider text-sm">Your Message</label>
                <textarea 
                  rows="4" 
                  placeholder="I HAVE AN EXCITING PROJECT FOR YOU..." 
                  class="w-full p-4 border-3 border-brutal-black font-bold uppercase placeholder-zinc-400 focus:outline-none focus:bg-brutal-cream resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <BrutalistBtn type="submit" color="yellow" class="w-full">
                  Send Message
                </BrutalistBtn>
              </div>
            </form>
          </BrutalistCard>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// Page for Get in Touch route
</script>
