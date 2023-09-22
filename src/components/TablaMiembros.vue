<style>
.v-icon.red--text {
  color: rgb(224, 86, 86);
}

.v-icon.green--text {
  color: rgb(97, 187, 97);
}
</style>

<template>
  <div>
    <v-text-field
      v-model="search"
      label="Buscar por nombre o código"
      variant="outlined"
      append-inner-icon="mdi-magnify"
      density="compact"
      style="max-width: 550px; color:aqua"
      
    />
    
    <v-btn color="primary" class="mb-5 "  fab dark @click="estados.formMiembros={display:true,mode:'add',id:''}">
      <v-icon>mdi-plus</v-icon>
      Agregar miembro
    </v-btn>
    <!-- Agregar el diálogo/modal -->
    

    <v-table dense  :sort-by="'Codigo'" :sort-desc="false" theme="dark" style="border: 1px solid #767575;">
      <thead>
        <tr>
          <th class="text-left">No.</th>
          <th class="text-left">Documento</th>
          <th class="text-left">Nombre</th>
       
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayedItems" :key="index">
          <td>{{ index+1 }}</td>
           <td>{{ item.numeroDocumento }}</td>
          <td> 
            {{
    item.nombre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  }}
      {{
    item.apellido.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
  }}
          </td>
          
         
          <td>
            <v-icon class="mr-2" color="blue" title="Editar" style="cursor: pointer;" @click="estados.formMiembros={display:true,mode:'edit',id:item.id}" >mdi-pencil</v-icon>
            <v-icon class="mr-2" color="green" title="Ver" style="cursor: pointer;"  @click="estados.formMiembros={display:true,mode:'view',id:item.id}">mdi-eye</v-icon>
            <v-icon color="red" title="Eliminar" style="cursor: pointer;" >mdi-delete</v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="5"
      :ellipsis="null"
      :boundary-links="false"
      @input="changePage"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      style="border: 1px solid #767575; color: aqua;"
    />
  </div>
</template>

<script setup>

import { ref, computed, watch} from 'vue';
import { useAppStore } from "../store/app";
//import { useRouter } from "vue-router";




const estados = useAppStore();
const currentPage = ref(1);
const itemsPerPage = ref(20);
const search = ref('');
const desserts = ref(estados.miembros);

const sortedItems = computed(() => {
  return filteredDesserts.value.sort((a, b) => {
    if (a.numeroDocumento < b.numeroDocumento) {
      return -1;
    }
    if (a.numeroDocumento > b.numeroDocumento) {
      return 1;
    }
    return 0;
  });
});


const filteredDesserts = computed(() => {
  currentPage.value = 1;
  const regex = new RegExp(search.value, "i");
  return desserts.value.filter(item => regex.test(item.nombre) || regex.test(item.numeroDocumento));
});


const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value);
});
const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedItems.value.slice(start, end);
});

const totalItems = computed(() => filteredDesserts.value.length);

function changePage(page) {
  currentPage.value = page;
}



watch(() => estados.miembros, (newVal, oldVal) => {
  desserts.value = newVal;
});




</script>
