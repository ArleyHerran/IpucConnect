<template>
    
    <v-app id="inspire">
      <Drawer></Drawer>
      <Bar></Bar>
     
  
      <v-main style="min-height: calc(100vh - 64px);max-height: calc(100vh); overflow-y: auto; background: rgb(244, 243, 243);padding: 80px 10px 20px 10px; ">
        <!--  -->
        <slot></slot>
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