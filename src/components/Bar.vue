<template>
    
    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="estados.drawerDisplay = !estados.drawerDisplay"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>IpucConnect</v-app-bar-title>

      <v-spacer></v-spacer>

     
      <v-menu
        v-model="menu"
        location="top start"
        origin="top start"
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }" >
          <v-badge v-bind="props" :content="estados.notificaciones.value"   color="error"  v-if="estados.notificaciones.value >=1" class="mr-5">
         <v-icon  class="icon" size="x-large">mdi-bell</v-icon>
      </v-badge>

      <v-btn    v-bind="props" icon v-if="estados.notificaciones.value===0">
        <v-icon  class="icon" size="x-large">mdi-bell</v-icon>
      </v-btn>
        </template>

        <v-card width="300" v-if="estados.notificaciones.value>0">
          <v-list bg-color="black">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon class="icon" size="x-large">mdi-bell</v-icon>
              </template>

              <v-list-item-title>Notificaciones</v-list-item-title>

              <template v-slot:append>
                <v-list-item-action>
                  <v-btn
                    icon
                    variant="text"
                    @click="menu = false"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>

          <v-list>
            <v-list-item link prepend-icon="mdi-message-alert" v-if="estados.notificaciones.solicitudes>0" :to="{ name: 'Solicitudes' }">
              <v-list-item-subtitle>Nuevas Solicitudes {{ estados.notificaciones.solicitudes }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item link prepend-icon="mdi-information" v-if="estados.notificaciones.informacion >0">
              <v-list-item-subtitle>Informativos {{ estados.notificaciones.informacion }}</v-list-item-subtitle>
            </v-list-item>
           
          </v-list>
        </v-card>
      </v-menu>
    

      
      
    </v-app-bar>


</template>

<script setup>
import { useAppStore } from "../store/app";

import { onMounted ,ref,watch} from "vue";
//import config from '@/components/Config.vue'

const estados = useAppStore();

const  menu=ref(false);


</script>

