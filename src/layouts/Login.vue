
<style>


.bodyLogin {
  min-height: calc(100vh - 40px);
  max-height:calc(100vh - 64px);
  background: radial-gradient(circle, #071a2bd6 0%, #092035 90%);
    
}



.main-content {
  max-height: 100%;
  overflow-y: auto;
  padding: 10px;

  border-top: 1px solid rgb(107, 107, 107);
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
.bar1{
  background: #265c8b;
}
.footer{
  background: #071a2b;
  color:#dddddd;
}
</style>

<template>
  <v-app id="inspire">
    <v-app-bar class="bar1" color="#144A7B">
      
      <v-app-bar-title  class="text-amber-darken-2 " ><span class="text-decoration-underline">Sgm</span><span class=" text-decoration-underline" style="color:#dddddd;">Ipuc</span></v-app-bar-title>

  </v-app-bar>
    <v-main class="bodyLogin">
    
      <div class="main-content">
        <slot></slot>
      </div>
    </v-main>
    <v-footer app
    class=" text-center d-flex flex-column footer"
    
  >
    
    <div class="pt-0">
    Contacto:3134878371
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>sgm-ipuc</strong>
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

  
