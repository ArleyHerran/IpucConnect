<template>
  <v-app id="inspire">
    <Drawer :drawerOpen="drawerOpen"></Drawer>
    <Bar @toggleDrawer="toggleDrawer"></Bar>

    <v-main :style="mainStyles">
      <h4 style="color: rgb(125, 125, 125); padding-left: 12px; width: 150px; margin-bottom: 0px; ">{{ $route.name }}/</h4>
      <div class="main-content">
        <slot></slot>
      </div>
    </v-main>
    <footerA />
  </v-app>
</template>

<style>
.main-content {
  max-height: calc(100vh - 64px); /* Ajusta según la altura del header si es diferente */
  overflow-y: auto;
  padding: 20px;
  
  border-top: 1px solid rgb(56, 56, 56);
}
</style>

<script setup>
import { ref } from 'vue'
import Drawer from '@/components/Drawer.vue'
import Bar from '@/components/Bar.vue'
import footerA from '@/components/footer.vue'

const drawerOpen = ref(false)
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const mainStyles = ref({
  minHeight: 'calc(100vh - 64px)', // Ajusta según la altura del header si es diferente
  maxHeight: 'calc(100vh - 64px)', // Ajusta según la altura del header si es diferente
})
</script>
