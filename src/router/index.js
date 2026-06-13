import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { projects } from '../data/projects.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Farhan Alwanda - Full-Stack Developer & AI Engineer' },
  },
  {
    path: '/education',
    name: 'education',
    component: () => import('../views/EducationView.vue'),
    meta: { title: 'Pendidikan & Karier | Farhan Alwanda' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: { title: 'Projects & Work | Farhan Alwanda' },
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('../views/ProjectDetailView.vue'),
    meta: { title: 'Project Detail | Farhan Alwanda' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'Skills & Expertise | Farhan Alwanda' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Contact Me | Farhan Alwanda' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

if (import.meta.env.DEV) {
  routes.push({
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue'),
    meta: { title: 'Dev Test | Farhan Alwanda' },
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  routes,
})

router.beforeEach((to) => {
  if (to.name === 'project-detail') {
    const slug = to.params.slug
    const project = projects.find((p) => p.slug === slug)
    if (project) {
      document.title = `${project.title} | Farhan Alwanda`
    } else {
      document.title = 'Project Detail | Farhan Alwanda'
    }
  } else {
    document.title = to.meta.title || 'Farhan Alwanda - Portfolio'
  }
})

export default router
