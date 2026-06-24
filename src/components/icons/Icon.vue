<script setup>
import { computed } from 'vue'

import IconLucideX from '~icons/lucide/x'
import IconLucideMenu from '~icons/lucide/menu'
import IconLucideAward from '~icons/lucide/award'
import IconLucideEye from '~icons/lucide/eye'
import IconLucideCalendar from '~icons/lucide/calendar'
import IconLucideDownload from '~icons/lucide/download'
import IconLucideExternalLink from '~icons/lucide/external-link'
import IconLucideImage from '~icons/lucide/image'
import IconLucideStar from '~icons/lucide/star'
import IconLucideArrowRight from '~icons/lucide/arrow-right'
import IconLucideArrowLeft from '~icons/lucide/arrow-left'
import IconLucideMapPin from '~icons/lucide/map-pin'
import IconLucideCheckCircle2 from '~icons/lucide/check-circle-2'
import IconLucideChevronLeft from '~icons/lucide/chevron-left'
import IconLucideChevronRight from '~icons/lucide/chevron-right'
import IconLucideGraduationCap from '~icons/lucide/graduation-cap'
import IconLucideBriefcase from '~icons/lucide/briefcase'
import IconLucideGithub from '~icons/lucide/github'
import IconLucideLayoutGrid from '~icons/lucide/layout-grid'
import IconLucideUser from '~icons/lucide/user'
import IconLucideComponent from '~icons/lucide/component'
import IconLucideZap from '~icons/lucide/zap'
import IconLucideCpu from '~icons/lucide/cpu'
import IconLucideRadio from '~icons/lucide/radio'
import IconLucideMicrochip from '~icons/lucide/microchip'
import IconLucideServer from '~icons/lucide/server'
import IconLucideLightbulb from '~icons/lucide/lightbulb'
import IconLucideUsers from '~icons/lucide/users'
import IconLucideMessageCircle from '~icons/lucide/message-circle'
import IconLucideClock from '~icons/lucide/clock'
import IconLucideRefreshCw from '~icons/lucide/refresh-cw'
import IconLucideBrain from '~icons/lucide/brain'
import IconLucideMail from '~icons/lucide/mail'
import IconLucideLinkedin from '~icons/lucide/linkedin'
import IconLucideInstagram from '~icons/lucide/instagram'
import IconLucideHelpCircle from '~icons/lucide/help-circle'

import IconLogosVue from '~icons/logos/vue'
import IconLogosTailwindcss from '~icons/logos/tailwindcss-icon'
import IconLogosJavascript from '~icons/logos/javascript'
import IconLogosFlutter from '~icons/logos/flutter'
import IconLogosLaravel from '~icons/logos/laravel'
import IconLogosGo from '~icons/logos/go'
import IconLogosPython from '~icons/logos/python'
import IconLogosPostgresql from '~icons/logos/postgresql'
import IconLogosMysql from '~icons/logos/mysql'
import IconLogosRedis from '~icons/logos/redis'
import IconLogosMongodb from '~icons/logos/mongodb'
import IconLogosDocker from '~icons/logos/docker-icon'
import IconLogosGit from '~icons/logos/git-icon'
import IconLogosLinux from '~icons/logos/linux-tux'
import IconLogosNginx from '~icons/logos/nginx'
import IconLogosReact from '~icons/logos/react'
import IconLogosNextjs from '~icons/logos/nextjs-icon'
import IconLogosTypescript from '~icons/logos/typescript-icon'
import IconLogosNodejs from '~icons/logos/nodejs-icon'
import IconLogosGraphql from '~icons/logos/graphql'
import IconLogosAws from '~icons/logos/aws'
import IconLogosFirebase from '~icons/logos/firebase'
import IconLogosSupabase from '~icons/logos/supabase-icon'

import IconSimpleIconsFastapi from '~icons/simple-icons/fastapi'
import IconSimpleIconsOpenai from '~icons/simple-icons/openai'
import IconSimpleIconsIbm from '~icons/simple-icons/ibm'

import IconMdiShieldLock from '~icons/mdi/shield-lock'
import IconMdiKey from '~icons/mdi/key'
import IconMdiChip from '~icons/mdi/chip'
import IconMdiAccessPointNetwork from '~icons/mdi/access-point-network'
import IconMdiViewDashboard from '~icons/mdi/view-dashboard'
import IconMdiRaspberryPi from '~icons/mdi/raspberry-pi'
import IconMdiCodeTags from '~icons/mdi/code-tags'

import IconPhMoonStarsBold from '~icons/ph/moon-stars-bold'
import IconPhSunBold from '~icons/ph/sun-bold'

import IconDinkieCodeFilled from '~icons/dinkie-icons/code-filled'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
})

const iconRegistry = {
  'lucide:x': IconLucideX,
  'lucide:menu': IconLucideMenu,
  'lucide:award': IconLucideAward,
  'lucide:eye': IconLucideEye,
  'lucide:calendar': IconLucideCalendar,
  'lucide:download': IconLucideDownload,
  'lucide:external-link': IconLucideExternalLink,
  'lucide:image': IconLucideImage,
  'lucide:star': IconLucideStar,
  'lucide:arrow-right': IconLucideArrowRight,
  'lucide:arrow-left': IconLucideArrowLeft,
  'lucide:map-pin': IconLucideMapPin,
  'lucide:check-circle-2': IconLucideCheckCircle2,
  'lucide:chevron-left': IconLucideChevronLeft,
  'lucide:chevron-right': IconLucideChevronRight,
  'lucide:graduation-cap': IconLucideGraduationCap,
  'lucide:briefcase': IconLucideBriefcase,
  'lucide:github': IconLucideGithub,
  'lucide:layout-grid': IconLucideLayoutGrid,
  'lucide:user': IconLucideUser,
  'lucide:component': IconLucideComponent,
  'lucide:zap': IconLucideZap,
  'lucide:cpu': IconLucideCpu,
  'lucide:radio': IconLucideRadio,
  'lucide:microchip': IconLucideMicrochip,
  'lucide:server': IconLucideServer,
  'lucide:lightbulb': IconLucideLightbulb,
  'lucide:users': IconLucideUsers,
  'lucide:message-circle': IconLucideMessageCircle,
  'lucide:clock': IconLucideClock,
  'lucide:refresh-cw': IconLucideRefreshCw,
  'lucide:brain': IconLucideBrain,
  'lucide:mail': IconLucideMail,
  'lucide:linkedin': IconLucideLinkedin,
  'lucide:instagram': IconLucideInstagram,
  'lucide:help-circle': IconLucideHelpCircle,
  'logos:vue': IconLogosVue,
  'logos:tailwindcss-icon': IconLogosTailwindcss,
  'logos:javascript': IconLogosJavascript,
  'logos:flutter': IconLogosFlutter,
  'logos:laravel': IconLogosLaravel,
  'logos:go': IconLogosGo,
  'logos:python': IconLogosPython,
  'logos:postgresql': IconLogosPostgresql,
  'logos:mysql': IconLogosMysql,
  'logos:redis': IconLogosRedis,
  'logos:mongodb': IconLogosMongodb,
  'logos:docker-icon': IconLogosDocker,
  'logos:git-icon': IconLogosGit,
  'logos:linux-tux': IconLogosLinux,
  'logos:nginx': IconLogosNginx,
  'logos:react': IconLogosReact,
  'logos:nextjs-icon': IconLogosNextjs,
  'logos:typescript-icon': IconLogosTypescript,
  'logos:nodejs-icon': IconLogosNodejs,
  'logos:graphql': IconLogosGraphql,
  'logos:aws': IconLogosAws,
  'logos:firebase': IconLogosFirebase,
  'logos:supabase-icon': IconLogosSupabase,
  'simple-icons:fastapi': IconSimpleIconsFastapi,
  'simple-icons:openai': IconSimpleIconsOpenai,
  'simple-icons:ibm': IconSimpleIconsIbm,
  'mdi:shield-lock': IconMdiShieldLock,
  'mdi:key': IconMdiKey,
  'mdi:chip': IconMdiChip,
  'mdi:access-point-network': IconMdiAccessPointNetwork,
  'mdi:view-dashboard': IconMdiViewDashboard,
  'mdi:raspberry-pi': IconMdiRaspberryPi,
  'mdi:code-tags': IconMdiCodeTags,
  'ph:moon-stars-bold': IconPhMoonStarsBold,
  'ph:sun-bold': IconPhSunBold,
  'dinkie-icons:code-filled': IconDinkieCodeFilled,
}

const iconComponent = computed(() => {
  const component = iconRegistry[props.icon]
  if (!component && import.meta.env.DEV) {
    console.warn(`Icon "${props.icon}" not found in registry. Using fallback.`)
  }
  return component || IconLucideHelpCircle
})
</script>

<template>
  <component :is="iconComponent" v-bind="$attrs" />
</template>
