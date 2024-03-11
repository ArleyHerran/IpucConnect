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
</style>

<template>
  <div>
    <v-row style="max-width: 100%">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="search"
          label="Buscar por nombre o número de documento"
          variant="outlined"
          append-inner-icon="mdi-magnify"
          density="compact"
          style="color: rgb(5, 5, 5); height: 48px"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="filtro"
          clearable
          chips
          label="Filtrar"
          :items="[
            'Hombres',
            'Mujeres',
            'Ancianos',
            'Adultos',
            'Jovenes',
            'Adolecentes',
            'Niños',
          ]"
          multiple
          style="height: 40px"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        class="d-flex justify-start align-center flex-wrap"
      >
        <v-btn
        size="small"
          color="primary"
          class="mb-2 mr-2"
          fab
          dark
          @click="estados.formMiembros = { display: true, mode: 'add', id: '' }"
        >
          <v-icon>mdi-plus</v-icon>
          Agregar miembro
        </v-btn>

        <v-btn @click="exportDataToExcel" color="success" class="mb-2 mr-2" size="small">
          <v-icon left>mdi-file-excel</v-icon> Exportar a Excel
        </v-btn>
      </v-col>
    </v-row>

    <v-table
    density="compact"
      fixed-header
      :sort-by="'Codigo'"
      :sort-desc="false"
      class="small-font-table"
      style="border: 1px solid #767575"
      height="250px"
  
    >
      <thead>
        <tr>
          <th class="text-left hide-on-small-screen">No.</th>
          <th class="text-left hide-on-small-screen ">Documento</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayedItems" :key="index">
          <td class="hide-on-small-screen">{{ index + 1 }}</td>
          <td class="hide-on-small-screen">{{ item.numeroDocumento }}</td>
          <td class="max-14-chars">
            {{formattedName(item)}}
             
          </td>

          <td>
            <v-icon
              class="mr-2"
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
              class="mr-2"
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAppStore } from "../store/app";
import { doc, deleteDoc, setDoc, runTransaction } from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import swal from "sweetalert";
//import { useRouter } from "vue-router";

const estados = useAppStore();
const currentPage = ref(1);
const itemsPerPage = ref(20);
const search = ref("");
const personas = ref(estados.miembros);
const filtro = ref([]);

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

  const fil = filtrara(personas.value);

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

watch(
  () => estados.miembros,
  (newVal, oldVal) => {
    personas.value = newVal;
  }
);

const exportDataToExcel = async () => {
  const exportA = await swal({
    title: "¿ Estás seguro ?",
    text: "Esto exportara a excel la lista de todos los miembros de la congregacion",
    icon: "info",

    buttons: true,
    dangerMode: true,
  });

  if (!exportA) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Miembros");

  // Define las propiedades (columnas) que deseas incluir en la exportación
  const propertiesToInclude = [
    "tipoDocumento",
    "numeroDocumento",
    "nombre",
    "apellido",
    "rol",
    "fechaNacimiento",
    "celular",
    "direccion",
    "sexo",
    "estadoCivil",
    "esBautizado",
    "fechaBautismo",
    "nombrePastorBautismo",
    "referenciaPastoral",
  ];

  // Agrega un título a la tabla

  const titleCell = worksheet.getCell("A1");
  titleCell.font = { bold: true, size: 16 }; // Texto en negrita y tamaño
  titleCell.alignment = { horizontal: "center" }; // Alineación centrada

  // Configura los encabezados personalizados
  const customHeaders = [
    "Tipo de Documento",
    "Número de Documento",
    "Nombre",
    "Apellido",
    "Rol",
    "Fecha de Nacimiento",
    "Celular",
    "Dirección",
    "Sexo",
    "Estado Civil",
    "Es Bautizado",
    "Fecha de Bautismo",
    "Nombre del Pastor de Bautismo",
    "Referencia Pastoral",
  ];

  // Agrega las columnas personalizadas a la hoja de cálculo
  worksheet.columns = propertiesToInclude.map((prop, index) => ({
    header: customHeaders[index], // Nombre del encabezado personalizado
    key: prop, // Propiedad de los datos
    width: 20, // Ancho de la columna
  }));

  // Mapea los datos de prueba para incluir solo las propiedades deseadas

  const data = displayedItems;

  const filteredData = data.value.map((item) => {
    const filteredItem = {};
    for (const prop of propertiesToInclude) {
      filteredItem[prop] = item[prop];
    }
    return filteredItem;
  });

  // Agrega los encabezados en la segunda fila con negrita y formato
  const headerRow = worksheet.addRow(customHeaders);
  headerRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "2291A3" }, // Fondo azul
    };
    cell.font = {
      bold: true, // Negrita
      color: { argb: "FFFFFF" }, // Letra blanca
    };
  });

  // Agrega los datos filtrados a la hoja de cálculo
  worksheet.addRows(filteredData);

  // Aplicar bordes a todas las celdas de la tabla
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  worksheet.mergeCells("A1:N1"); // Fusiona las celdas para el título
  titleCell.value = "Membresía IPUC"; // Título
  // Crea el archivo Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    try {
      if (buffer && buffer.length > 0) {
        // Descarga el archivo Excel en el navegador
        saveAs(new Blob([buffer]), "MembresiaIpuc.xlsx");
      } else {
        console.error("El archivo Excel está vacío.");
      }
    } catch (error) {
      console.error("Error al descargar el archivo Excel:", error);
    }
  });
};

async function eliminarM(m) {
  const confirmacion = await swal({
    title: "¿Seguro que desea eliminar este registro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    buttons: ["Cancelar", "Sí, eliminar"],
    dangerMode: true,
  });

  if (!confirmacion) return;

  estados.progre = true;
  try {
    await runTransaction(db, async (transaction) => {
      await setDoc(doc(db, "PapeleraMiembros", m.id), m);
      await deleteDoc(doc(db, "Membresia", m.id));
    });
    estados.progre = false;
    swal("Eliminación exitosa", "", "success");
  } catch (e) {
    estados.progre = false;
    swal("Ocurrió un error", `${e}`, "error");
  }
}

function filtrara(params) {
  if (filtro.value.length === 0) {
    return params;
  }

  let filteredList = [...params];
  var list = [];
  if (filtro.value.includes("Hombres")) {
    list = filteredList.filter((item) => item.sexo === "Hombre");
  }

  if (filtro.value.includes("Mujeres")) {
    list = [...list, ...filteredList.filter((item) => item.sexo === "Mujer")];
  }

  if (!filtro.value.includes("Mujeres") && !filtro.value.includes("Hombres")) {
    list = filteredList;
  }

  var listab = [];
  if (filtro.value.includes("Ancianos")) {
    listab = [
      ...listab,
      ...list.filter((item) => calculateAge(item.fechaNacimiento) >= 65),
    ];
  }

  if (filtro.value.includes("Adultos")) {
    listab = [
      ...listab,
      ...list.filter(
        (item) =>
          calculateAge(item.fechaNacimiento) >= 36 &&
          calculateAge(item.fechaNacimiento) <= 64
      ),
    ];
  }

  if (filtro.value.includes("Jovenes")) {
    listab = [
      ...listab,
      ...list.filter(
        (item) =>
          calculateAge(item.fechaNacimiento) >= 18 &&
          calculateAge(item.fechaNacimiento) <= 35
      ),
    ];
  }

  if (filtro.value.includes("Adolecentes")) {
    listab = [
      ...listab,
      ...list.filter(
        (item) =>
          calculateAge(item.fechaNacimiento) >= 12 &&
          calculateAge(item.fechaNacimiento) <= 17
      ),
    ];
  }

  if (filtro.value.includes("Niños")) {
    listab = [
      ...listab,
      ...list.filter(
        (item) =>
          calculateAge(item.fechaNacimiento) >= 0 &&
          calculateAge(item.fechaNacimiento) <= 11
      ),
    ];
  }

  if (
    !filtro.value.includes("Ancianos") &&
    !filtro.value.includes("Adultos") &&
    !filtro.value.includes("Jovenes") &&
    !filtro.value.includes("Adolecentes") &&
    !filtro.value.includes("Niños")
  ) {
    listab = list;
  }

  return Array.from(new Set(listab));
}

function calculateAge(f) {
  // Calcular la edad a partir de la fecha de nacimiento
  const fechaNacimiento = new Date(f);
  const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
  return edad;
}


function formattedName(item) {
      const formattedFirstName = item.nombre
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      const formattedLastName = item.apellido
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      return formattedFirstName + " " + formattedLastName;
    }
</script>
<style>
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
</style>