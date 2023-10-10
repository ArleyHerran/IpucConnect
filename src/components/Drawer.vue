<template>
    <v-navigation-drawer
      v-model="estados.drawerDisplay"
  
     
      hide-overlay
      no-scrollbar
      style="background: #292929; color: aliceblue ;max-height: 100vh;"
      
    >
      <div class="no-scrollbar">
        <!-- contenido de drawer aquí -->
        <v-list-item
          style="background:#4e6374; color: aliceblue"
          class="pa-6"
          prepend-avatar="../img/logo_ipuc.png"
          :title="estados.data !== null ? estados.data.nombre : ''"

        >
      
      </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav class="menu-list" >
          <v-list-item
            v-for="item in menuItems"
            :key="item.value"
            :v-bind:color="item.color_ico"
            :title="item.title"
            :value="item.value"
            @click="navigateTo(item)"
            :active="item.value === $route.name ? true : false"
          
            style="display: flex;background:red,"
         
          >

            <template v-slot:prepend>
              <v-icon
                :class="{
                  'custom-icon': true,
                  'custom-icon-active': item.active,
                }"
                :style="{ color: item.color_ico }"
              >
                {{ item.icon }}
              </v-icon>
            </template>
          </v-list-item>
        </v-list>
      </div>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click=" cerrarSesion()" color="primary">
            Cerrar sesion
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import { useAppStore } from "../store/app";
  import { useRouter } from "vue-router";
  import { onMounted } from "vue";
  import {  signOut } from "firebase/auth";
  import { auth} from "../ConfigFirebase";
  import swal from 'sweetalert';
  //import config from '@/components/Config.vue'
  
  const estados = useAppStore();
  const router = useRouter();
  
  const menuItems = [
    {
      color_ico: "#79b5ff",
      icon: "mdi-view-dashboard",
      title: "Dashboard ",
      value: "Dashboard",
      active: true,
    },
    {
      color_ico: "#79b5ff",
      icon: "mdi-account-group",
      title: "Miembros",
      value: "Miembros",
      active: false,
    },
    {
      color_ico: "#79b5ff",
      icon: "mdi-magnify",
      title: "Consultas",
      value: "Consultas",
      active: false,
    },
   /*
    {
      color_ico: "#79b5ff",
      icon: "mdi-balloon",
      title: "Cumpleaños",
      value: "Birthday",
      active: true,
    },
    */
    {
      color_ico: "#79b5ff",
      icon: "mdi-message-alert",
      title: "Solicitudes",
      value: "Solicitudes",
      active: false,
    },
  
    {
      color_ico: "#79b5ff",
      icon: "mdi-lightbulb-on",
      title: "Sugerencias",
      value: "Sugerencias",
      active: false,
    },

    {
      color_ico: "#79b5ff",
      icon: "mdi-information",
      title: "Acerca de..",
      value: "Informacion",
      active: false,
    },
    
    
    
  ];
  
  function navigateTo(item) {
    menuItems.forEach((i) => (i.active = false)); // establece active en false para todos los elementos
    item.active = true; // establece active en true para el elemento seleccionado
    router.push({ name: item.value });
  }

  function cerrarSesion() {
  swal({
    title: "¿Seguro que desea cerrar sesión?",
    text: "Se cerrará su sesión actual.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willLogout) => {
    if (willLogout) {
      // Cerrar sesión utilizando Firebase Authentication
      signOut(auth)
        .then(() => {
          // Sign-out exitoso.
          // Recargar la página actual para redirigir al usuario a la página de inicio de sesión.
          location.reload();
        })
        .catch((error) => {
          // Si ocurrió un error durante el cierre de sesión, mostrar una alerta con el error.
          alert(error);
        });
    } else {
      // El usuario canceló la acción, no se hace nada.
    }
  });
}

  
  onMounted(async () => {
    await estados.getDataUser();
    
    
  });

  </script>
  
  <style>
  .active {
    background-color: #b81818;
  }
  </style>
  