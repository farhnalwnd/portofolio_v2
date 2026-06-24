export const techIcons = {
  'Vue.js': 'logos:vue',
  Vue: 'logos:vue',
  'Vue 3': 'logos:vue',
  Laravel: 'logos:laravel',
  Python: 'logos:python',
  FastAPI: 'simple-icons:fastapi',
  Docker: 'logos:docker-icon',
  React: 'logos:react',
  'Next.js': 'logos:nextjs-icon',
  PostgreSQL: 'logos:postgresql',
  MySQL: 'logos:mysql',
  Redis: 'logos:redis',
  MongoDB: 'logos:mongodb',
  OAuth2: 'mdi:shield-lock',
  JWT: 'mdi:key',
  Flutter: 'logos:flutter',
  Go: 'logos:go',
  'OpenAI API': 'simple-icons:openai',
  'Tailwind CSS': 'logos:tailwindcss-icon',
  ESP32: 'mdi:chip',
  MQTT: 'mdi:access-point-network',
  Filament: 'mdi:view-dashboard',
  JavaScript: 'logos:javascript',
  TypeScript: 'logos:typescript-icon',
  Nodejs: 'logos:nodejs-icon',
  'Node.js': 'logos:nodejs-icon',
  GraphQL: 'logos:graphql',
  Git: 'logos:git-icon',
  Nginx: 'logos:nginx',
  Linux: 'logos:linux-tux',
  AWS: 'logos:aws',
  Firebase: 'logos:firebase',
  Supabase: 'logos:supabase-icon',
  Arduino: 'mdi:chip',
  'Raspberry Pi': 'mdi:raspberry-pi',
}

export const techColors = {
  Vue: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  Laravel: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  Python: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  Docker: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  React: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  PostgreSQL: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  MySQL: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
  Redis: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  MongoDB: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  Flutter: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  Go: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  FastAPI: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  ESP32: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  MQTT: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  Filament: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
  JavaScript: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  TypeScript: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  'Tailwind CSS': { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
}

export const getTechIcon = (techName) => {
  return techIcons[techName] || 'mdi:code-tags'
}

export const getTechColor = (techName) => {
  return techColors[techName] || techColors.Vue
}
