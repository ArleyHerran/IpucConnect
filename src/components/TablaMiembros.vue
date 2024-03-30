<style>
.v-icon.red--text {
  color: rgb(224, 86, 86);
}

.v-icon.green--text {
  color: rgb(97, 187, 97);
}

.small-font-table td {
  font-size: 14px; /* Establece el tamaño de fuente deseado */
}

@media (max-width: 767px) {
  .hide-on-small-screen {
    display: none !important;
  }
}

.max-14-chars {
  max-width: 25ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (max-width: 654px) {
  .max-14-chars {
    max-width: 18ch;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.custom-checkbox .v-input--checkbox .v-input--selection-controls__input {
  width: 16px; /* ajusta el ancho del checkbox */
  height: 16px; /* ajusta la altura del checkbox */
}

.custom-checkbox .v-label {
  font-size: 12px; /* ajusta el tamaño del texto */
}
</style>

<template>
  <div>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-text-field
          density="compact"
          v-model="search"
          label="Buscar por nombre o número de documento"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
          class="mr-2"
          style="max-width: 400px; border: 1px solid #78909c"
        ></v-text-field>

        <v-menu v-model="menu" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-badge
              v-bind="props"
              :content="filtro.length"
              color="#546E7A"
              v-if="filtro.length > 0"
              class="mr-5 elevation-1"
            >
              <v-icon class="icon" color="#546E7A">mdi-filter-outline</v-icon>
            </v-badge>
            <v-icon
              class="icon mr-5 elevation-1"
              color="#546E7A"
              v-bind="props"
              v-if="filtro.length === 0"
              >mdi-filter</v-icon
            >
          </template>

          <v-card min-width="auto">
            <v-alert-title>Filtro</v-alert-title>
            <v-divider></v-divider>

            <v-list>
              <v-list-item style="" v-for="(i, k) in filterItems" :key="k">
                <input
                  type="checkbox"
                  :id="i.title"
                  :value="i.title"
                  :checked="filtro.includes(i.title)"
                  @change="toggleFilter(i.title)"
                />
                <label
                  :for="i.title"
                  style="
                    margin-left: 8px;
                    width: 100%;
                    text-decoration: underline blue; /* Línea roja */
                    text-decoration-thickness: 1px; /* Grosor de la línea */
                    text-decoration-style: underline; /* Estilo de la línea */
                  "
                  >{{ i.title }}</label
                >
              </v-list-item>
            </v-list>
            <v-card-actions class="justify-center">
              <v-btn
                color="red-lighten-1"
                prepend-icon="mdi-close"
                variant="flat"
                @click="
                  filtro = [];
                  menu = false;
                "
                size="small"
                style="text-transform: none"
              >
                Limpiar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-spacer class="d-none d-sm-flex"></v-spacer>
        <v-btn
          color="primary"
          class="mb-2 mr-2"
          fab
          dark
          @click="estados.formMiembros = { display: true, mode: 'add', id: '' }"
          style="text-transform: none"
        >
          <v-icon>mdi-plus</v-icon>

          <span class="d-none d-sm-flex">Agregar miembro</span>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>
      <v-table
        density="compact"
        fixed-header
        :sort-by="'Codigo'"
        :sort-desc="false"
        class="small-font-table"
        style="border: 1px solid #767575; border-bottom: 0px"
        height="250px"
        show-col-dividers
      >
        <thead>
          <tr>
            <th class="text-left hide-on-small-screen">No.</th>
            <th class="text-left hide-on-small-screen">Documento</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in displayedItems" :key="index">
            <td class="hide-on-small-screen">{{ index + 1 }}</td>
            <td class="hide-on-small-screen">{{ item.numeroDocumento }}</td>
            <td class="max-14-chars">
              {{ formattedName(item) }}
            </td>

            <td>
              <v-icon
                class="mr-2 elevation-1"
                color="blue"
                title="Editar"
                style="cursor: pointer"
                @click="
                  estados.formMiembros = {
                    display: true,
                    mode: 'edit',
                    id: item.id,
                  }
                "
                >mdi-pencil</v-icon
              >
              <v-icon
                class="mr-2 elevation-1"
                color="green"
                title="Ver"
                style="cursor: pointer"
                @click="
                  estados.formMiembros = {
                    display: true,
                    mode: 'view',
                    id: item.id,
                  }
                "
                >mdi-eye</v-icon
              >
              <v-icon
                class="elevation-1"
                color="#EF5350"
                title="Eliminar"
                style="cursor: pointer"
                @click="eliminarM(item)"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination
        class="small-font-table"
        v-model="currentPage"
        :length="totalPages"
        :total-visible="5"
        :ellipsis="null"
        :boundary-links="false"
        @input="changePage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        style="border: 1px solid #767575; color: rgb(0, 0, 0)"
      />
      <v-btn
        @click="exportDataToExcel(displayedItems)"
        color="success"
        class="mb-2 mr-2 mt-2"
        style="text-transform: none"
      >
        <v-icon left>mdi-file-excel</v-icon> Exportar a Excel
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAppStore } from "../store/app";
import { exportDataToExcel } from "../scripts/exportExcel";
import { filtrara, formattedName } from "../scripts/functions";
import { eliminarM } from "../scripts/functionsFirebase";
//import { saveAs } from "file-saver";
import swal from "sweetalert";
//import { useRouter } from "vue-router";

const estados = useAppStore();
const currentPage = ref(1);
const itemsPerPage = ref(20);
const search = ref("");
const personas = ref(estados.miembros);
const filtro = ref([]);
const menu = ref(false);
const filterItems = ref([
  { title: "Hombres" },
  { title: "Mujeres" },
  { title: "Ancianos" },
  { title: "Adultos" },
  { title: "Jovenes" },
  { title: "Adolecentes" },
  { title: "Niños" },
]);
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

  const fil = filtrara(personas.value, filtro);

  return fil.filter(
    (item) =>
      regex.test(item.nombre) ||
      regex.test(item.numeroDocumento) ||
      regex.test(item.apellido)
  );
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

function toggleFilter(title) {
  if (filtro.value.includes(title)) {
    filtro.value = filtro.value.filter((item) => item !== title);
  } else {
    filtro.value.push(title);
  }
}

watch(
  () => estados.miembros,
  (newVal, oldVal) => {
    personas.value = newVal;
  }
);
</script>
