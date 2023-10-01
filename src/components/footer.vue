<template>
    <v-footer class="bg-grey-lighten-1" app="">
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-1" cols="12">
          {{ new Date().getFullYear() }} — <strong>Version 1.0</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  <script>
    export default {
      data: () => ({
        links: [
          'Home',
          'About Us',
          'Team',
          'Services',
          'Blog',
          'Contact Us',
        ],
      }),
    }
  </script>