export const projects = [
  {
    slug: 'cv-matcher-ai',
    title: 'CV Matcher AI',
    description:
      'AI-powered recruitment tool for HR and job seekers utilizing semantic search and smart skill matching.',
    thumbnail: '/image.png',
    techStack: ['Python', 'FastAPI', 'Sentence-Transformers', 'PyTorch', 'Vue.js', 'Docker'],
    category: 'Artificial Intelligence',
    featured: true,
    year: 2026,
    fullDescription:
      'CV Matcher AI is an intelligent recruitment platform designed to bridge the gap between HR professionals and job seekers. The system implements semantic search and deep skill matching by leveraging the "paraphrase-multilingual-MiniLM-L12-v2" model, which has been fine-tuned using a Bi-Encoder architecture. This allows the system to understand the contextual meaning of resumes and job descriptions beyond simple keyword matching, ranking candidates based on true technical capability and experience.',
    links: {
      github: 'https://github.com/farhan-alwanda/cv-matcher-ai',
      demo: null,
    },
  },
  {
    slug: 'catera-iot',
    title: 'Catera (Catering Tap Entry & Record Access)',
    description:
      'Corporate IoT-based meal quota management system with automated employee verification and real-time database synchronization.',
    thumbnail: '/image.png',
    techStack: ['ESP32', 'RFID', 'Node-RED', 'Laravel', 'Filament', 'MySQL'],
    category: 'IoT & Web Application',
    featured: true,
    year: 2026,
    fullDescription:
      'An end-to-end IoT solution developed for corporate meal quota management at Oneject Indonesia. Jobdesk and features include: Integrating ESP32 microcontrollers and RFID hardware with Node-RED for efficient data routing; creating smart data processing flows for automated employee verification at tap entry points; and developing a centralized administrative dashboard using Laravel and Filament for real-time synchronization and record access.',
    links: {
      github: 'https://github.com/farhan-alwanda/catera-iot',
      demo: null,
    },
  },
  {
    slug: 'the-bridge-sso',
    title: 'The Bridge SSO (IT-Framework CMS)',
    description:
      'Enterprise centralized portal architecture with Single Sign-On and dynamic access permission mapping.',
    thumbnail: '/image.png',
    techStack: ['Laravel', 'Filament', 'OAuth2', 'JWT', 'PostgreSQL', 'Redis'],
    category: 'Web Application',
    featured: true,
    year: 2026,
    fullDescription:
      'An enterprise authentication and portal solution developed to integrate multiple internal corporate modules at Oneject Indonesia. Jobdesk and features include: Designing a centralized portal architecture using Laravel and the Filament admin panel; implementing secure token-based OAuth2 and JWT authentication standards with custom ticket-based session bridging; and creating a dynamic role-based access control (RBAC) system for comprehensive audit logging and permission mapping.',
    links: {
      github: 'https://github.com/farhan-alwanda/the-bridge-sso',
      demo: null,
    },
  },
  {
    slug: 'sortify',
    title: 'Sortify',
    description:
      'Undergraduate Thesis: IoT and AI-based automatic waste bin system capable of classifying and sorting waste in real-time.',
    thumbnail: '/image.png',
    techStack: ['Python', 'Scikit-learn', 'ESP32', 'Raspberry Pi', 'Flutter', 'Go', 'PostgreSQL', 'Docker'],
    category: 'IoT & AI',
    featured: true,
    year: 2025,
    fullDescription:
      'An intelligent waste management system developed as an undergraduate graduation requirement at President University. Jobdesk and features include: Designing and building hardware systems using ESP32 and Raspberry Pi microcontrollers for sensor integration; custom training machine learning models to classify and sort different types of waste automatically in real-time; developing a cross-platform mobile app using Flutter for monitoring; and writing high-performance backend services in Go with PostgreSQL and Docker infrastructure.',
    links: {
      github: 'https://github.com/farhan-alwanda/sortify',
      demo: null,
    },
  },
  {
    slug: 'internal-financial-system',
    title: 'Internal Financial Management System',
    description:
      'Corporate budget management application featuring automated fund tracking and interdepartmental loans.',
    thumbnail: '/image.png',
    techStack: ['Laravel', 'Alpine.js', 'AJAX', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Web Application',
    featured: false,
    year: 2025,
    fullDescription:
      'A robust financial web application developed during tenure at Sinar Meadow International Indonesia. Jobdesk and features include: Architecting a budget management application serving over 100 enterprise users; writing and integrating an automated fund tracking module to optimize financial workflows; and implementing seamless, dynamic AJAX-based interdepartmental loan features for a responsive user interface.',
    links: {
      github: null,
      demo: null,
    },
  },
  {
    slug: 'sales-portfolio-cms',
    title: 'Sales Portfolio CMS',
    description:
      'Custom TALL Stack CMS designed to digitize corporate product portfolios with a mobile-first approach.',
    thumbnail: '/image.png',
    techStack: ['Laravel', 'Filament', 'Alpine.js', 'Tailwind CSS', 'MySQL'],
    category: 'Web Application',
    featured: false,
    year: 2025,
    fullDescription:
      'A custom content management system built for Sinar Meadow International Indonesia to expand its digital marketing reach. Jobdesk and features include: Developing the full platform using the TALL Stack (Tailwind CSS, Alpine.js, Laravel, Livewire) and Filament admin panel; and translating requirements into a modern, highly responsive mobile-first design to digitize the complete corporate product portfolio.',
    links: {
      github: null,
      demo: null,
    },
  },
  {
    slug: 'automated-stock-monitoring',
    title: 'Automated Stock Monitoring System',
    description:
      'Real-time inventory threshold detection system with automated Excel report generation and mail queues.',
    thumbnail: '/image.png',
    techStack: ['Laravel', 'Laravel Jobs', 'Laravel Mail', 'Excel Automation', 'MySQL'],
    category: 'Web Application / Backend DevOps',
    featured: false,
    year: 2025,
    fullDescription:
      'An inventory alert system engineered for Sinar Meadow International Indonesia. Jobdesk and features include: Designing a backend background automation framework using Laravel Jobs and Mail; writing logic to detect critical inventory thresholds in real time; and automatically compiling warehouse data and generating analytical reports sent directly via email in Excel format to ensure data accuracy.',
    links: {
      github: null,
      demo: null,
    },
  },
  {
    slug: 'warehouse-requisition-system',
    title: 'Warehouse Requisition & Approval System',
    description:
      'End-to-end goods requisition system with dynamic multi-level approval flows and comprehensive audit logs.',
    thumbnail: '/image.png',
    techStack: ['Laravel', 'Filament', 'PDF Generator', 'PostgreSQL'],
    category: 'Web Application',
    featured: false,
    year: 2025,
    fullDescription:
      'An administrative web ecosystem built for Sinar Meadow International Indonesia. Jobdesk and features include: Developing an end-to-end goods requisition platform to streamline warehouse administration; structuring a complex, dynamic multi-level approval flow based on user roles; and integrating a automated PDF report generator and precise audit logs for corporate transparency.',
    links: {
      github: null,
      demo: null,
    },
  },
  {
    slug: 'smart-inventory',
    title: 'Smart Inventory System',
    description:
      'Real-time inventory tracking system with barcode scanning and predictive stock alerts.',
    thumbnail: '/image.png',
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