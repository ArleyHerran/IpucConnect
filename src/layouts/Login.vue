<template>
    
    <v-app id="inspire">
     
     
  
      <v-main>
        <!--  -->
        
        <slot></slot>
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
    const drawer = ref(null)
   
 
      const icons=ref( [
        'mdi-facebook',
        'mdi-whatsapp',
       
      ])



  </script>
  
