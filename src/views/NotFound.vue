<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center">
            <v-icon size="100" color="red">mdi-alert-circle-outline</v-icon>
            <h1 class="red--text">Error 404</h1>
            <p>La página que buscas no existe.</p>
            <router-link to="/">Volver a la página de inicio</router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados para el componente NotFound */
  </style>
  