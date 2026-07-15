export const projects = [
  {
    slug: 'cv-matcher-ai',
    title: 'CV Matcher AI',
    description:
      'AI-powered recruitment tool for HR and job seekers utilizing semantic search and smart skill matching.',
    thumbnail: '/porto/porto-cv.webp',
    techStack: ['Python', 'FastAPI', 'Sentence-Transformers', 'PyTorch', 'Vue.js', 'Docker'],
    category: 'Artificial Intelligence',
    categoryShort: 'AI',
    featured: true,
    year: 2026,
    fullDescription:
      'CV Matcher AI is an intelligent recruitment platform designed to bridge the gap between HR professionals and job seekers. The system implements semantic search and deep skill matching by leveraging the "paraphrase-multilingual-MiniLM-L12-v2" model, which has been fine-tuned using a Bi-Encoder architecture. This allows the system to understand the contextual meaning of resumes and job descriptions beyond simple keyword matching, ranking candidates based on true technical capability and experience.',
    links: {
      github: 'https://github.com/farhnalwnd/dicoding-capstone',
      demo: null,
    },
  },
  {
    slug: 'catera',
    title: 'Catera (Catering Tap Entry & Record Access)',
    description:
      'An IoT-based meal quota management system with automated employee verification and real-time synchronization.',
    thumbnail: '/image.png',
    techStack: ['ESP32', 'RFID', 'Node-RED', 'Laravel', 'Filament', 'Livewire'],
    category: 'Internet of Things',
    categoryShort: 'IoT',
    featured: false,
    year: 2026,
    fullDescription:
      'Catera is an end-to-end digital solution designed for corporate meal quota management. By combining ESP32 microcontrollers and RFID technology, the system enables automated employee verification at tap entry points. Node-RED handles smart data processing and real-time database synchronization with a Laravel Filament backend, ensuring seamless and secure administration.',
    links: {
      github: '',
      demo: null,
    },
  },
  {
    slug: 'it-framework-cms',
    title: 'SSO Portal Management',
    description:
      'A centralized secure portal ecosystem with dynamic access permissions and centralized authentication.',
    thumbnail: '/porto/porto-portal.webp',
    techStack: ['Laravel', 'Filament', 'PHP', 'Tailwind CSS', 'laravel schantum', 'flutter'],
    category: 'Web Development',
    categoryShort: 'Web',
    featured: true,
    year: 2026,
    fullDescription:
      'The IT-Framework CMS is a centralized portal architecture engineered to integrate various internal corporate systems into a single secure ecosystem (SSO system). Developed using Laravel, flutter and Filament, it implements a highly secure centralized authentication mechanism alongside dynamic access permission mapping, giving administrators granular control over user roles across platforms.',
    links: {
      github: '',
      demo: null,
    },
  },
  {
    slug: 'internal-financial-management-system',
    title: 'Internal Financial Management System',
    description:
      'An automated budget tracking and interdepartmental loan application built for enterprise financial workflows.',
    thumbnail: '/porto/porto-web.webp',
    techStack: ['Laravel', 'Alpine.js', 'AJAX', 'PHP', 'MySQL'],
    category: 'Web Development',
    categoryShort: 'Web',
    featured: false,
    year: 2025,
    fullDescription:
      'An enterprise-grade budget management application serving 100+ internal users. Built with Laravel and Alpine.js, it streamlines corporate administration through automated fund tracking and dynamic interdepartmental budget loans. The platform enforces financial compliance by incorporating a secure, multi-tier hierarchical approval system for all transactional reallocations.',
    links: {
      github: 'https://github.com/farhnalwnd/budgeting',
      demo: null,
    },
  },
  {
    slug: 'sales-portfolio-cms',
    title: 'Sales Portfolio CMS',
    description:
      'A modern, mobile-first custom CMS to digitize and expand corporate digital marketing reach.',
    thumbnail: '/porto/porto-mormade.webp',
    techStack: ['Laravel', 'Filament', 'Tailwind CSS', 'TALL Stack'],
    category: 'Web Development',
    categoryShort: 'Web',
    featured: false,
    year: 2025,
    fullDescription:
      "Developed for Sinar Meadow International Indonesia, this custom Content Management System leverages the TALL stack (Tailwind CSS, Alpine.js, Laravel, Livewire) via Filament to digitize the company's product portfolio. It features a modern, mobile-first design tailored to significantly expand the company's digital marketing and B2B engagement.",
    links: {
      github: '',
      demo: null,
    },
  },
  {
    slug: 'automated-stock-monitoring-system',
    title: 'Automated Stock Monitoring System',
    description:
      'A real-time inventory system with automated threshold detection and automated Excel reporting.',
    thumbnail: '/image.png',
    techStack: ['Laravel', 'Laravel Jobs', 'Laravel Mail', 'PHP'],
    category: 'Web Development',
    categoryShort: 'Web',
    featured: false,
    year: 2025,
    fullDescription:
      'A Laravel-powered backend automation project designed to optimize warehouse inventory monitoring. By fetching real-time stock data directly from SAP, the system automatically detects when critical thresholds are breached and dispatches immediate email alerts to the person-in-charge. Additionally, it automates corporate reporting by compiling detailed inventory accuracy data into Excel format for scheduled email distribution.',
    links: {
      github: '',
      demo: null,
    },
  },
  {
    slug: 'warehouse-requisition-approval-system',
    title: 'Warehouse Requisition System',
    description:
      'An end-to-end goods requisition system with multi-level approval workflows and secure audit logging.',
    thumbnail: '/porto/porto-rs.webp',
    techStack: ['Laravel', 'PHP', 'jquery' ,'PDF-Generator', 'MySQL'],
    category: 'Web Development',
    categoryShort: 'Web',
    featured: true,
    year: 2025,
    fullDescription:
      'An end-to-end corporate supply chain administrative system equipped with a dynamic multi-level approval flow. To maximize transparency and speed up warehouse administration, the platform includes automated audit logging and a PDF report generator module.',
    links: {
      github: 'https://github.com/farhnalwnd/requisition-slip',
      demo: null,
    },
  },
  {
    slug: 'sortify',
    title: 'Sortify',
    description:
      'An IoT and AI-powered automatic waste bin system capable of classifying and sorting waste in real-time.',
    thumbnail: '/image.png',
    techStack: ['Python', 'Machine Learning', 'IoT', 'Smart Sensors', 'ESP32'],
    category: 'Artificial Intelligence & IoT',
    categoryShort: 'AI & IoT',
    featured: true,
    year: 2025,
    fullDescription:
      'Sortify was designed and implemented as an undergraduate thesis project at President University. The system integrates artificial intelligence with Internet of Things hardware to create an automatic waste bin capable of recognizing, classifying, and physically sorting different types of waste in real-time utilizing smart sensor data and machine learning models.',
    links: {
      github: '',
      demo: null,
    },
  },
  {
    slug: 'e-voting-system',
    title: 'E-Voting System',
    description:
      'A secure and transparent electronic voting system for seamless and real-time election management.',
    thumbnail: '/porto/porto-vote.webp',
    techStack: ['Laravel', 'MySQL', 'CSS'],
    category: 'Web Development',
    categoryShort: 'Web',
    featured: false,
    year: 2024,
    fullDescription:
      'A web-based e-voting platform built to ensure integrity, speed, and security in election administration. Built with Laravel and Vanilla CSS, it features real-time live-count result visualization, voter authentication to prevent duplicate submissions, and a comprehensive admin interface for election configurations.',
    links: {
      github: 'https://github.com/farhnalwnd/votesystem',
      demo: null,
    },
  },
];
