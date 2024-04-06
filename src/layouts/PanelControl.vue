<style>


.bodyHome {
  min-height: calc(100vh - 40px);
  max-height:calc(100vh - 64px);
  background: #F1F4F4;
  
}


.route-name {
  color: rgb(125, 125, 125);
  padding-left: 10px;
  padding-right: 12px;
  padding-top:8px;
  padding-bottom: 8px;
  width: 150px;
  margin-bottom: 0px;
}

.main-content{
  max-height: 100%;
  overflow-y: auto;
  border-top: 1px solid rgb(180, 177, 177);
  border-bottom: 1px solid rgb(180, 177, 177);
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




</style>

<template>
  <v-app id="inspire">

    <Drawer :drawerOpen="drawerOpen"></Drawer>
    <Bar @toggleDrawer="toggleDrawer" color="#F1F4F4"></Bar>
   
    <v-main class="bodyHome">
      <h4 class="route-name bg-primary " style="width: 100%;">{{ $route.name }}/<span v-if="route.name==='Birthday'">🎁🎂​🥳​​</span></h4>
      <div class="main-content" :style="{ padding: mainContentPadding }">
        <slot></slot>
      </div>
    </v-main>
    <footerA color="#F1F4F4" />
  </v-app>
</template>



<script setup>
import { ref,onMounted ,computed} from 'vue'
import { useAppStore } from "../store/app";
import Drawer from '@/components/Drawer.vue'
import Bar from '@/components/Bar.vue'
import footerA from '@/components/footer.vue'
const estados = useAppStore();
import { useRoute } from 'vue-router';

const drawerOpen = ref(false)
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

onMounted(() => {
  setTimeout(()=>{
    estados.progre=false;
  },500);
 
});
const route = useRoute();
const mainContentPadding = computed(() => {
  // Lógica para determinar la clase basada en la ruta
  if (route.name === 'Birthday') {
    return '0px';
  } else{
 return '10px';
  }
});
</script>
