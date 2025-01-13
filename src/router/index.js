// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { auth} from "../ConfigFirebase";

const userC=auth.currentUser;
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
     
       {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta:{auth:true}
      },
      {
        path: '/Miembros',
        name: 'Miembros',
        component: () => import( '@/views/Miembros.vue'),
        meta:{auth:true}
      },
      {
        path: '/Amigos',
        name: 'Amigos',
        component: () => import( '@/views/Amigos.vue'),
        meta:{auth:true}
      },
      {
        path: '/Consultas',
        name: 'Consultas',
        component: () => import('@/views/Consultas.vue'),
        meta:{auth:true}
      },
     
      {
        path: '/Birthday',
        name: 'Birthday',
        component: () => import( '@/views/Birthday.vue'),
        meta:{auth:true}
      },
      {
        path: '/Solicitudes',
        name: 'Solicitudes',
        component: () => import('@/views/Solicitudes.vue'),
        meta:{auth:true}
      },
      {
        path: '/Sugerencias',
        name: 'Sugerencias',
        component: () => import('@/views/Sugerencias.vue'),
        meta:{auth:true}
      },
      {
        path: '/Informacion',
        name: 'Informacion',
        component: () => import('@/views/Informacion.vue'),
        meta:{auth:true}
      },
      {
        path: '/Login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta:{auth:false}
      },
      {
        path: '/Form',
        name: 'Form',
        component: () => import('@/views/FormMiembros.vue'),
        meta:{auth:false}
      },
      {
        // Ruta catch-all para manejar errores 404
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
      },
    ],
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// Función para obtener el usuario actual de Firebase Authentication como una promesa
function obtenerUsuarioActual() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // Detiene la suscripción después de obtener el estado
      resolve(user); // Resuelve la promesa con el usuario actual
    });
  });
}

router.beforeEach(async (to, from, next) => {
  // Espera a que se resuelva la promesa para obtener el usuario actual
  const user = await obtenerUsuarioActual();

  if (to.path.toLowerCase() === "/login" && user) {
    next("");
    
  } else if (to.matched.some((record) => record.meta.auth) && !user) {
    next("/Login");
  
  } else {
    next();
    
  }
})



export default router
