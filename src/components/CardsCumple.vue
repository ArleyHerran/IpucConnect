<template>
  <v-card color="transparent" class="mx-auto elevation-0">
    <div
      style="display: flex; align-items: center; padding: 0px"
      color="blue-grey-darken-4"
      density="compact"
      class="elevation-0"
    >
      <v-btn
        icon="mdi-arrow-left"
        @click="back()"
        class="mr-4 ml-2  elevation-5 mt-2"
        v-if="tab == 'tab-2'"
        variant="text"
        size="x-small"
        
      ></v-btn>
     
    </div>

    <v-window v-model="tab">
      <v-window-item v-for="i in 2" :key="i" :value="'tab-' + i">
        <!-- Importa y utiliza el componente según la pestaña -->
        <component :is="getComponent(i)" />
      </v-window-item>
    </v-window>

    <div class="pa-4" v-if="tab === 'tab-1'">
      <v-btn
        fab
        large
        color="blue"
        class="ma-0 w-100 "
        style="text-transform: none;"
        @click="tab = 'tab-2'"
        
      >
        <span class="mr-2">Más Cumpleaños🎂</span>
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";
import { useAppStore } from "../store/app";
const estados = useAppStore();
import Birthday from "@/components/Birthday.vue";
import MasBirthdays from "@/components/MasBirthdays.vue";

const tab = ref("tab-1");

const { tabProps } = defineProps(["tab"]);
const getComponent = (index) => {
  switch (index) {
    case 1:
      return Birthday;
    case 2:
      return MasBirthdays;
  }
};

const back = () => {
  if (tab.value === "tab-2") {
    tab.value = "tab-1";
  } else if (tab.value === "tab-1") {
    window.close();
  }
};

onMounted(() => {
  estados.getDataUser();
});
</script>
