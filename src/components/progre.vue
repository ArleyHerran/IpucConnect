<template>
    <v-dialog v-model="estados.progre" persistent max-width="200" max-height="80">
      <div class="loading-overlay">
        <v-card>
          <v-card-text>
            <v-progress-circular  color="deep-orange-lighten-2" indeterminate  :width="2"></v-progress-circular>
            <span> Cargando...</span>
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>
  </template>
  
  <style scoped>
  .loading-overlay {
    background-color: rgba(0, 0, 0, 1); /* Color de fondo semi-transparente */
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .loading-dialog {
    max-width: 200px;
    max-height: 80px;
  }
  </style>
  
  <script setup>
  import { ref } from 'vue';
  import { useAppStore } from "../store/app";
  const estados = useAppStore();
  const loading = ref(true);
  
  </script>
  
  