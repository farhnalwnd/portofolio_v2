export const personalInfo = {
  name: 'Farhan Alwanda',
  title: 'Full-Stack Developer & AI Engineer',
  description:
    'Shipping clean stacks, deploying smart brains.',
  email: 'raja.farhan.alwanda@gmail.com',
  phone: '+628978648072',
  whatsapp: 'https://wa.me/628978648072',
  linkedin: 'https://www.linkedin.com/in/farhan-alwanda/',
  instagram: 'https://www.instagram.com/farhnalwnd/',
  github: 'https://github.com/farhnalwnd',
  lastEducation: 'President University - Informatika Engineering',
  lastJob: 'Oneject Indonesia - Full-Stack Developer',
}

export const contactChannels = [
  {
    name: 'Email',
    icon: 'lucide:mail',
    href: `mailto:${personalInfo.email}`,
    label: personalInfo.email,
    colorClass: 'group-hover:border-blue-500/50 group-hover:bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    external: false,
  },
  {
    name: 'WhatsApp',
    icon: 'lucide:message-circle',
    href: personalInfo.whatsapp,
    label: personalInfo.phone,
    colorClass: 'group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    external: true,
  },
  {
    name: 'LinkedIn',
    icon: 'lucide:linkedin',
    href: personalInfo.linkedin,
    label: 'linkedin.com/in/farhan-alwanda',
    colorClass: 'group-hover:border-[#0077B5]/50 group-hover:bg-[#0077B5]/10',
    iconColor: 'text-[#0077B5]',
    external: true,
  },
  {
    name: 'GitHub',
    icon: 'lucide:github',
    href: personalInfo.github,
    label: 'github.com/farhan-alwanda',
    colorClass:
      'group-hover:border-black/50 dark:group-hover:border-white/50 group-hover:bg-black/5 dark:group-hover:bg-white/10',
    iconColor: 'text-black dark:text-white',
    external: true,
  },
  {
    name: 'Instagram',
    icon: 'lucide:instagram',
    href: personalInfo.instagram,
    label: '@farhan.alwanda',
    colorClass: 'group-hover:border-[#E1306C]/50 group-hover:bg-[#E1306C]/10',
    iconColor: 'text-[#E1306C]',
    external: true,
  },
]
