// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/default.vue'),
    children: [
     
       {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/Miembros',
        name: 'Miembros',
        component: () => import( '@/views/Miembros.vue'),
      },
      {
        path: '/Consultas',
        name: 'Consultas',
        component: () => import('@/views/Consultas.vue'),
      },
      {
        path: '/Certificados',
        name: 'Certificados',
        component: () => import('@/views/Certificados.vue'),
      },
      {
        path: '/Birthday',
        name: 'Birthday',
        component: () => import( '@/views/Birthday.vue'),
      },
      {
        path: '/Login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
