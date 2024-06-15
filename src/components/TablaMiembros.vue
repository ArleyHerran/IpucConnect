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

.column-divider {
  border: 0.1px solid #bdbbbb;
}

.selectFila:hover {
  background: #ede7f6;
}


/* Para mostrar en dispositivos pequeños */
.show-on-small-screen {
    display: none; /* Oculta por defecto */
}

@media only screen and (max-width: 768px) {
    .show-on-small-screen {
        display: block; /* Muestra en dispositivos pequeños */
    }
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

.inputBox {
  background: rgb(255, 255, 255);
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-radius: 20px;
  border: 1px solid #a1a1a1;
  display: flex;
  align-items: center;
  width: 75%;
  max-width: 360px; /* Ancho máximo del contenedor */
}

.inputBox label {
  margin-left: 10px;
}

.conte1 {
  align-items: center;
}
.inputBox input {
  background: none;
  flex: 1; /* El campo de entrada se expandirá para ocupar el espacio disponible */
  box-sizing: border-box; /* Incluir el tamaño del borde y el relleno en el ancho */
  font-size: 0.9rem;
  border-radius: 4px; /* Bordes redondeados */
  outline: none; /* Eliminar el contorno al enfocar */
  overflow: hidden; /* Ocultar el desbordamiento del input */
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Otros navegadores */
}
.inputBox input[type="number"]::-webkit-inner-spin-button,
.inputBox input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Eliminar las flechas de incremento y decremento en Chrome/Safari */
  margin: 0; /* Asegurar que no haya margen alrededor de las flechas */
}
.btnAdd {
  background: #1866be;
  display: flex;
  padding: 6px;
  padding-right: 8px;
  padding-left: 8px;

  border-radius: 8px;
  color: white;
}

.btnAdd:hover {
  background: #1865bedb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
}

.btnExcel {
  background: #19a05b;
  display: flex;
  padding: 6px;
  padding-right: 8px;
  padding-left: 8px;

  border-radius: 8px;
  color: white;
}

.btnExcel:hover {
  background: #19a05ad5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
}
</style>

<template>
  <div>
    <v-card flat color="transparent">
      <v-card-text class="d-flex align-center conte1">
        <div class="inputBox mr-2">
          <label><v-icon icon="mdi-magnify" size="20"></v-icon></label>
          <input
            v-model="search"
            type="text"
            placeholder="Buscar por nombre o número de documento"
            maxlength="5"
          />
          <label> </label>
        </div>
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-badge
              v-bind="props"
              :content="displayedItems.length"
              v-if="filtro.length > 0"
              class="mr-8 elevation-1"
              color="#263238"
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
                    text-decoration: underline gray; /* Línea roja */
                    text-decoration-thickness: 1px; /* Grosor de la línea */
                    text-decoration-style: underline; /* Estilo de la línea */
                  "
                  >{{ i.title }}</label
                >
              </v-list-item>
            </v-list>
            <v-card-actions class="justify-center">
              <v-btn
                color="#78909C"
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

        <button
          class="mb-2 mr-2 btnExcel elevation-1 d-none d-sm-flex"
          color="success"
          @click="exportDataToExcel(displayedItems)"
        >
          <v-icon>mdi-file-excel</v-icon>
          <span>Exportar a Excel</span>
        </button>

        <button
          class="mb-2 mr-2 btnAdd elevation-1"
          color="primary"
          @click="estados.formMiembros = { display: true, mode: 'add', id: '' }"
        >
          <v-icon>mdi-plus</v-icon>
          <span class="d-none d-sm-flex">Agregar miembro</span>
        </button>
      </v-card-text>

      <v-divider></v-divider>
      <v-table
        density="compact"
        fixed-header
        :sort-by="'Codigo'"
        :sort-desc="false"
        class="small-font-table"
        style="border: 0px solid #767575; border-bottom: 0px"
        height="500px"
      >
        <thead>
          <tr>
           
            <th class="text-left hide-on-small-screen column-divider">
              Documento
            </th>
            <th class="text-left column-divider hide-on-small-screen">Nombre</th>
            <th class="text-center column-divider hide-on-small-screen">Acciones</th>
            <th class="text-center column-divider  show-on-small-screen">Personas</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in displayedItems"
            :key="index"
            class="selectFila"
          >
            
            <td class="hide-on-small-screen column-divider ">
              {{ item.numeroDocumento }}
            </td>
            <td class="max-14-chars column-divider hide-on-small-screen">
              {{ formattedName(item) }}
            </td>

            <td class="text-center column-divider hide-on-small-screen">
              <v-icon
                class="mr-2 "
                color="blue"
                title="Editar"
                style="cursor: pointer"
                @click="
                  estados.formMiembros = {
                    display: true,
                    mode: 'edit',
                    id: item.numeroDocumento,
                  }
                "
                >mdi-pencil</v-icon
              >
              <v-icon
                class="mr-2 "
                color="green"
                title="Ver"
                style="cursor: pointer"
                @click="
                  estados.formMiembros = {
                    display: true,
                    mode: 'view',
                    id: item.numeroDocumento,
                  }
                "
                >mdi-eye</v-icon
              >
              <v-icon
                class=""
                color="#EF5350"
                title="Eliminar"
                style="cursor: pointer"
                @click="eliminarM(item)"
                >mdi-delete</v-icon
              >
            </td>
            <td class="column-divider show-on-small-screen" style="height: auto;">
              <div>
                <v-card-title> ID:{{ index + 1 }} </v-card-title>

                <v-card-text style="margin-top: -15px">
                  Nombre:{{ formattedName(item) }}
                </v-card-text>
                <v-card-subtitle style="margin-top: -15px">
                  Documento:{{ item.numeroDocumento }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-icon
                    class="mr-2 "
                    color="blue"
                    title="Editar"
                    style="cursor: pointer"
                    @click="
                      estados.formMiembros = {
                        display: true,
                        mode: 'edit',
                        id: item.numeroDocumento,
                      }
                    "
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    class="mr-2 "
                    color="green"
                    title="Ver"
                    style="cursor: pointer"
                    @click="
                      estados.formMiembros = {
                        display: true,
                        mode: 'view',
                        id: item.numeroDocumento,
                      }
                    "
                    >mdi-eye</v-icon
                  >
                  <v-icon
                    class=""
                    color="#EF5350"
                    title="Eliminar"
                    style="cursor: pointer"
                    @click="eliminarM(item)"
                    >mdi-delete</v-icon
                  >
                </v-card-actions>
              </div>
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
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAppStore } from "../store/app";
import { exportDataToExcel } from "../scripts/exportExcel";
import { filtrara, formattedName } from "../scripts/functions";
import { eliminarM } from "../scripts/functionsFirebase";
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
