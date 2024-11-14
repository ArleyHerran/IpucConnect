<template>
    <PanelControl>
     
     <tabla-amigos></tabla-amigos>
      <FormAmigos></FormAmigos>
    </PanelControl>
   </template>
   
   <script setup>
     import PanelControl from '@/layouts/PanelControl.vue'
     import TablaAmigos from '@/components/TablaAmigos.vue';
     import FormAmigos from '@/components/FormAmigoNuevo.vue';
     
   </script>