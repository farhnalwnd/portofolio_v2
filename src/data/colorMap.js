export const colorMap = {
  purple: {
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    glow: 'bg-purple-500/5 group-hover:bg-purple-500/10',
  },
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    glow: 'bg-emerald-500/5 group-hover:bg-emerald-500/10',
  },
  orange: {
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20 hover:border-orange-500/40',
    glow: 'bg-orange-500/5 group-hover:bg-orange-500/10',
  },
  accent: {
    text: 'text-accent-custom',
    bg: 'bg-accent-custom/10',
    border: 'border-accent-custom/20 hover:border-accent-custom/40',
    glow: 'bg-accent-custom/5 group-hover:bg-accent-custom/10',
  },
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20 hover:border-blue-500/40',
    glow: 'bg-blue-500/5 group-hover:bg-blue-500/10',
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20 hover:border-rose-500/40',
    glow: 'bg-rose-500/5 group-hover:bg-rose-500/10',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20 hover:border-amber-500/40',
    glow: 'bg-amber-500/5 group-hover:bg-amber-500/10',
  },
}

export const getColorClasses = (color) => {
  return colorMap[color] || colorMap.accent
}
