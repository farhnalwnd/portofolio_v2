<template>
  <div class="w-full min-h-screen bg-brutal-cream flex flex-col">
    <TheNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
