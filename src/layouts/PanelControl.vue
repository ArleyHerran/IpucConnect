<style>


.mainApp {
  min-height: calc(100vh - 40px);
  max-height:calc(100vh - 64px);
  
}


.route-name {
  color: rgb(125, 125, 125);
  padding-left: 30px;
  padding-right: 12px;
  width: 150px;
  margin-bottom: 0px;
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

    <Drawer :drawerOpen="drawerOpen"></Drawer>
    <Bar @toggleDrawer="toggleDrawer"></Bar>
   
    <v-main class="mainApp">
      <h4 class="route-name">{{ $route.name }}/</h4>
      <div class="main-content">
        <slot></slot>
      </div>
    </v-main>
    <footerA />
  </v-app>
</template>



<script setup>
import { ref,onMounted } from 'vue'
import { useAppStore } from "../store/app";
import Drawer from '@/components/Drawer.vue'
import Bar from '@/components/Bar.vue'
import footerA from '@/components/footer.vue'
const estados = useAppStore();

const drawerOpen = ref(false)
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

onMounted(() => {
  setTimeout(()=>{
    estados.progre=false;
  },1000);
 
});
</script>
