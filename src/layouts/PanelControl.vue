<template>
    
    <v-app id="inspire">
      <Drawer></Drawer>
      <Bar></Bar>
     
  
      <v-main>
        <!--  -->
        <h1>Hola Mundo</h1>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import Drawer from '@/components/Drawer.vue'
    import Bar from '@/components/Bar.vue'
    const drawer = ref(null)
  </script>
  
  <script>
    export default {
      data: () => ({ drawer: null }),
    }
  </script>