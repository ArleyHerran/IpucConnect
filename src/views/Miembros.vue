<template>
    <PanelControl>
     
      <TablaMiembros></TablaMiembros>
      <FormMiembros></FormMiembros>
    </PanelControl>
   </template>
   
   <script setup>
     import PanelControl from '@/layouts/PanelControl.vue'
     import TablaMiembros from '@/components/TablaMiembros.vue';
     import FormMiembros from '@/components/FormMiembroNuevo.vue';
   </script>