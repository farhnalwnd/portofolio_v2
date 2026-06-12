export const projects = [
  {
    slug: 'catera-iot',
    title: 'Catera IoT',
    description:
      'IoT-based smart monitoring system using ESP32 and MQTT protocol for real-time data transmission and visualization.',
    thumbnail: '/projects/catera-iot.jpg',
    techStack: ['ESP32', 'MQTT', 'Python', 'FastAPI', 'Vue.js', 'Docker'],
    category: 'IoT',
    featured: true,
    year: 2024,
    fullDescription:
      'Catera IoT is a comprehensive IoT solution designed for smart monitoring and data collection. The system leverages ESP32 microcontrollers for sensor integration, MQTT protocol for efficient real-time communication, and a modern web dashboard built with Vue.js for data visualization. The backend API is powered by FastAPI, ensuring high performance and scalability.',
    links: {
      github: 'https://github.com/farhan-alwanda/catera-iot',
      demo: null,
    },
  },
  {
    slug: 'the-bridge-sso',
    title: 'The Bridge SSO',
    description:
      'Enterprise-grade Single Sign-On authentication system with OAuth2 and JWT implementation for seamless user management.',
    thumbnail: '/projects/the-bridge-sso.jpg',
    techStack: ['Laravel', 'Filament', 'PostgreSQL', 'Redis', 'OAuth2', 'JWT'],
    category: 'Web Application',
    featured: true,
    year: 2023,
    fullDescription:
      'The Bridge SSO is an enterprise authentication solution that provides centralized user management and secure authentication across multiple applications. Built with Laravel and Filament admin panel, it implements OAuth2 and JWT standards for secure token-based authentication. The system features role-based access control, session management, and comprehensive audit logging.',
    links: {
      github: 'https://github.com/farhan-alwanda/the-bridge-sso',
      demo: null,
    },
  },
  {
    slug: 'sortify',
    title: 'Sortify',
    description:
      'Smart task management and organization tool with AI-powered categorization and priority suggestions.',
    thumbnail: '/projects/sortify.jpg',
    techStack: ['Flutter', 'Go', 'PostgreSQL', 'Docker', 'OpenAI API'],
    category: 'Mobile Application',
    featured: true,
    year: 2024,
    fullDescription:
      'Sortify is an intelligent task management application that helps users organize their work efficiently. The mobile app is built with Flutter for cross-platform compatibility, while the backend services are written in Go for optimal performance. The system integrates AI capabilities to automatically categorize tasks, suggest priorities, and provide smart reminders based on user behavior patterns.',
    links: {
      github: 'https://github.com/farhan-alwanda/sortify',
      demo: null,
    },
  },
  {
    slug: 'smart-inventory',
    title: 'Smart Inventory System',
    description:
      'Real-time inventory tracking system with barcode scanning and predictive stock alerts.',
    thumbnail: '/projects/smart-inventory.jpg',
    techStack: ['Laravel', 'Vue.js', 'MySQL', 'Tailwind CSS'],
    category: 'Web Application',
    featured: false,
    year: 2023,
    fullDescription:
      'A comprehensive inventory management system designed for small to medium businesses. Features include barcode scanning, real-time stock tracking, automated reorder alerts, and detailed analytics dashboard.',
    links: {
      github: null,
      demo: null,
    },
  },
]
