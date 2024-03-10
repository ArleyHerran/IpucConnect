<template>
  <v-card>
 
    <div
     style="display:flex; align-items: center; padding:8px;"
        color="blue-grey-darken-4"
        density="compact"
        class="elevation-0">
          <v-btn icon="mdi-arrow-left" @click="back()" class="mr-4" v-if="tab=='tab-2'"></v-btn>
        <v-app-bar-title>Cumpleaños🎂​🥳​🎈​🎁​</v-app-bar-title>
  </div>

    <v-window v-model="tab" >
      <v-window-item v-for="i in 2" :key="i" :value="'tab-' + i">
        <!-- Importa y utiliza el componente según la pestaña -->
        <component :is="getComponent(i)" />
      </v-window-item>
    </v-window>
 
   <div class="pa-4" v-if="tab==='tab-1'">
    <v-btn fab large color="blue-grey-darken-4" class="ma-0 w-100" @click="tab='tab-2'" variant="outlined">
           
           <span class="mr-2">Más Cumpleaños🎂</span>
          
         </v-btn>
   </div>


  </v-card>
</template>

<script setup>
import { ref ,defineProps,onMounted,} from 'vue';
import { useAppStore } from "../store/app";
const estados = useAppStore();
import Birthday from '@/components/Birthday.vue';
import MasBirthdays from '@/components/MasBirthdays.vue';

const tab = ref('tab-1');

const { tabProps } = defineProps(['tab']);
const getComponent = (index) => {
  switch (index) {
    case 1:
      return Birthday;
    case 2:
      return MasBirthdays;
    
  }
};

const back = () => {
  if(tab.value==="tab-2"){
    tab.value="tab-1";
  }else if (tab.value==="tab-1") {
    window.close();
  } 
};



onMounted(() => {
  estados.getDataUser();
});

</script>