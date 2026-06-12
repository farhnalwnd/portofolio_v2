export const skills = {
  hardSkills: [
    {
      category: 'Frontend',
      items: [
        { name: 'Vue.js', icon: 'logos:vue', level: 95 },
        { name: 'Tailwind CSS', icon: 'logos:tailwindcss', level: 90 },
        { name: 'JavaScript', icon: 'logos:javascript', level: 92 },
        { name: 'Flutter', icon: 'logos:flutter', level: 75 },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Laravel', icon: 'logos:laravel', level: 88 },
        { name: 'Filament', icon: 'lucide:component', level: 85 },
        { name: 'Go', icon: 'logos:go', level: 80 },
        { name: 'Python', icon: 'logos:python', level: 82 },
        { name: 'FastAPI', icon: 'lucide:zap', level: 78 },
      ],
    },
    {
      category: 'Database',
      items: [
        { name: 'PostgreSQL', icon: 'logos:postgresql', level: 85 },
        { name: 'MySQL', icon: 'logos:mysql', level: 88 },
        { name: 'Redis', icon: 'logos:redis', level: 70 },
        { name: 'MongoDB', icon: 'logos:mongodb', level: 65 },
      ],
    },
    {
      category: 'DevOps & Cloud',
      items: [
        { name: 'Docker', icon: 'logos:docker-icon', level: 82 },
        { name: 'Git', icon: 'logos:git-icon', level: 90 },
        { name: 'Linux', icon: 'logos:linux-tux', level: 80 },
        { name: 'Nginx', icon: 'logos:nginx', level: 72 },
      ],
    },
    {
      category: 'IoT & Hardware',
      items: [
        { name: 'ESP32', icon: 'lucide:cpu', level: 78 },
        { name: 'MQTT', icon: 'lucide:radio', level: 82 },
        { name: 'Arduino', icon: 'lucide:microchip', level: 70 },
        { name: 'Raspberry Pi', icon: 'lucide:server', level: 65 },
      ],
    },
  ],
  softSkills: [
    { name: 'Problem Solving', icon: 'lucide:lightbulb' },
    { name: 'Team Leadership', icon: 'lucide:users' },
    { name: 'Communication', icon: 'lucide:message-circle' },
    { name: 'Time Management', icon: 'lucide:clock' },
    { name: 'Adaptability', icon: 'lucide:refresh-cw' },
    { name: 'Critical Thinking', icon: 'lucide:brain' },
  ],
  certificates: [
    {
      id: 1,
      name: 'Backend Development with Go',
      issuer: 'Dicoding Indonesia',
      year: 2024,
      type: 'Backend',
      credential: 'https://dicoding.com/certificates/example1',
    },
    {
      id: 2,
      name: 'Cloud Computing',
      issuer: 'Dicoding Indonesia',
      year: 2023,
      type: 'Cloud',
      credential: 'https://dicoding.com/certificates/example2',
    },
    {
      id: 3,
      name: 'Introduction to AI',
      issuer: 'IBM SkillsBuild',
      year: 2024,
      type: 'AI',
      credential: 'https://skillsbuild.org/certificates/example3',
    },
    {
      id: 4,
      name: 'IoT Development',
      issuer: 'Dicoding Indonesia',
      year: 2023,
      type: 'IoT',
      credential: 'https://dicoding.com/certificates/example4',
    },
  ],
}
