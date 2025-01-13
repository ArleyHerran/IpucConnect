<template>
    <PanelControl>
      <TablaMiembros></TablaMiembros>
      <tomarImg></tomarImg>
      <FormMiembros></FormMiembros>
      <viewRegistro></viewRegistro>
      <SelectorImg></SelectorImg>
 
      
     
    </PanelControl>
   </template>
   <script setup>
     import PanelControl from '@/layouts/PanelControl.vue'
     import TablaMiembros from '@/components/TablaMiembros.vue';
     import FormMiembros from '@/components/FormMiembroNuevo.vue';
     import viewRegistro from '@/components/viewRegistro.vue';
     import SelectorImg from '@/components/SelectorImg.vue';
     import tomarImg from '@/components/tomarFoto.vue';
   </script>