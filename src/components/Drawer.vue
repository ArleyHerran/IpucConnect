<template>
  <v-navigation-drawer
    v-model="estados.drawerDisplay"
    hide-overlay
    no-scrollbar
    style="background: #373F52; color: #dcdddd; max-height: 100vh"
  >
    <v-card class="elevation-0 mt-2" color="transparent">
      <div class=" justify-space-between">
        <v-avatar class="ml-3" rounded="0" size="80">
          <v-img src="../img/icon-ipuc.png"></v-img>
        </v-avatar>
        <div>
          <v-card-title class="text-h6" style="margin-top: -0.2em; ">
  {{ estados.data ? estados.data.nombre : "" }}

 
</v-card-title>
<v-card-subtitle style="margin-top: -0.7em; margin-bottom: 1em;">
  Usuario: {{ estados.data ? estados.data.user : "" }}
</v-card-subtitle>
         
        </div>

        
      </div>
    </v-card>

    <div class="no-scrollbar">
      <!-- contenido de drawer aquí -->

      <v-divider></v-divider>
      <v-list density="compact" nav class="menu-list">
        <v-list-item
          v-for="item in menuItems"
          :key="item.value"
          :v-bind:color="item.color_ico"
          :title="item.title"
          :value="item.value"
          @click="navigateTo(item)"
          :active="item.value === $route.name ? true : false"
          class="pt-2 pb-2 mt-1"
          style="display: flex; font-size: 20px"
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
      <div class="pa-2 mb-3">
        <v-btn
          block
          @click="cerrarSesion()"
          color="primary"
          style="text-transform: none"
        >
          Cerrar sesión
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useAppStore } from "../store/app";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { signOut } from "firebase/auth";
import { auth } from "../ConfigFirebase";
import swal from "sweetalert";
const estados = useAppStore();
const router = useRouter();

const menuItems = [
  {
    color_ico: "#ffb002",
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    value: "Dashboard",
    active: true,
  },
  {
    color_ico: "#ff4949 ",
    icon: "mdi-account-network",
    title: "Miembros",
    value: "Miembros",
    active: false,
  },
  {
    color_ico: "#4CAF50",
    icon: "mdi-account-group",
    title: "Amigos",
    value: "Amigos",
    active: false,
  },
  {
    color_ico: "#0fa7f3",
    icon: "mdi-magnify",
    title: "Consultas",
    value: "Consultas",
    active: false,
  },

  {
    color_ico: "#fd90ff",
    icon: "mdi-balloon",
    title: "Cumpleaños",
    value: "Birthday",
    active: true,
  },

  {
    color_ico: "",
    icon: "mdi-message-alert",
    title: "Solicitudes",
    value: "Solicitudes",
    active: false,
  },
  /*
    {
      color_ico: "#FF5722",
      icon: "mdi-lightbulb-on",
      title: "Sugerencias",
      value: "Sugerencias",
      active: false,
    },*/

  {
    color_ico: "#04f6dd",
    icon: "mdi-information",
    title: "Acerca de..",
    value: "Informacion",
    active: false,
  },
];

function navigateTo(item) {
  if (router.currentRoute.value.name === item.value) return;
  estados.progre = true;
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
  }).then((willLogout) => {
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
