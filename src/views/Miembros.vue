<template>
    <PanelControl>
      <FormMiembros></FormMiembros>
      <TablaMiembros></TablaMiembros>
     
    </PanelControl>
   </template>
   
   <script setup>
     import PanelControl from '@/layouts/PanelControl.vue'
     import TablaMiembros from '@/components/TablaMiembros.vue';
     import FormMiembros from '@/components/FormMiembros.vue';
   </script>