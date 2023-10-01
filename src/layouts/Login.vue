
<style>


.mainApp {
  min-height: calc(100vh - 40px);
  max-height:calc(100vh - 64px);
  
}



.main-content {
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;

  border-top: 2px solid rgb(180, 177, 177);
}


/* Estilo personalizado para la barra de desplazamiento */
.main-content::-webkit-scrollbar {
  width: 6px; /* Ancho de la barra de desplazamiento */
}

.main-content::-webkit-scrollbar-thumb {
  background-color: #888; /* Color del pulgar (la parte que se arrastra) */
  border-radius: 3px; /* Bordes redondeados del pulgar */
}

.main-content::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Color del riel de la barra de desplazamiento */
  border-radius: 3px; /* Bordes redondeados del riel */
}

/* Estilos para Firefox */
.main-content {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}


</style>

<template>
  <v-app id="inspire">
    <v-app-bar   color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random">
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-app-bar-title>IpucConnect</v-app-bar-title>

  </v-app-bar>
    <v-main class="mainApp">
    
      <div class="main-content">
        <slot></slot>
      </div>
    </v-main>
    <v-footer app
    class=" text-center d-flex flex-column "
    style="background: #292929; color: aliceblue"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-1"
        :icon="icon"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0">
    Contacto:3134878371
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>IpucConnet</strong>
    </div>
  </v-footer>
  </v-app>
</template>



<script setup>
import { ref } from 'vue'
import Drawer from '@/components/Drawer.vue'
import Bar from '@/components/Bar.vue'
import footerA from '@/components/footer.vue'

const drawerOpen = ref(false)
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

</script>

  
