<style scoped>
.foter{
  height: 20px; 
  padding: 0;
  padding-bottom: 5px;
}
</style>

<template>
    <v-footer class="foter pt-5 pb-5 elevation-5" app >
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-2" cols="12">
          {{ new Date().getFullYear() }} — <strong style="margin: 0;">version 3.0</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  <script>
   
  </script>