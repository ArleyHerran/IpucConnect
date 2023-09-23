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
    
    <button @click="exportDataToExcel">Exportar a Excel</button>
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
import ExcelJS from 'exceljs';
import  {saveAs} from 'file-saver';
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

const exportDataToExcel = () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Miembros');

  // Datos de prueba
  const dataDePrueba = [
    {
      tipoDocumento: 'Cédula de Ciudadanía',
      numeroDocumento: '123456789',
      nombre: 'Juan',
      apellido: 'Pérez',
      rol: 'Miembro',
      fechaNacimiento: '1990-01-15',
      celular: '123-456-7890',
      direccion: 'Calle 123',
      sexo: 'Hombre',
      estadoCivil: 'Casado',
      esBautizado: 'Sí',
      fechaBautismo: '2022-05-20',
      nombrePastorBautismo: 'Pastor Smith',
      referenciaPastoral: 'Iglesia XYZ',
    },
    // Agrega más datos de prueba aquí...
  ];

  // Define las propiedades (columnas) que deseas incluir en la exportación
  const propertiesToInclude = [
    'tipoDocumento',
    'numeroDocumento',
    'nombre',
    'apellido',
    'rol',
    'fechaNacimiento',
    'celular',
    'direccion',
    'sexo',
    'estadoCivil',
    'esBautizado',
    'fechaBautismo',
    'nombrePastorBautismo',
    'referenciaPastoral',
  ];

  // Agrega un título a la tabla
  worksheet.mergeCells('A1:N1'); // Fusiona las celdas para el título
  const titleCell = worksheet.getCell('A1');
  titleCell.value = 'Membresía IPUC'; // Título
  titleCell.font = { bold: true, size: 16 }; // Texto en negrita y tamaño
  titleCell.alignment = { horizontal: 'center' }; // Alineación centrada

  // Configura los encabezados personalizados
  const customHeaders = [
    'Tipo de Documento',
    'Número de Documento',
    'Nombre',
    'Apellido',
    'Rol',
    'Fecha de Nacimiento',
    'Celular',
    'Dirección',
    'Sexo',
    'Estado Civil',
    'Es Bautizado',
    'Fecha de Bautismo',
    'Nombre del Pastor de Bautismo',
    'Referencia Pastoral',
  ];

  // Agrega las columnas personalizadas a la hoja de cálculo
  worksheet.columns = propertiesToInclude.map((prop, index) => ({
    header: customHeaders[index], // Nombre del encabezado personalizado
    key: prop, // Propiedad de los datos
    width: 15, // Ancho de la columna
  }));

  // Mapea los datos de prueba para incluir solo las propiedades deseadas
  const filteredData = estados.miembros.map(item => {
    const filteredItem = {};
    for (const prop of propertiesToInclude) {
      filteredItem[prop] = item[prop];
    }
    return filteredItem;
  });

 
// Agrega los encabezados en la segunda fila con negrita y formato
const headerRow = worksheet.addRow(customHeaders);
  headerRow.eachCell({ includeEmpty: true }, cell => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2291A3' }, // Fondo azul
    };
    cell.font = {
      bold: true, // Negrita
      color: { argb: 'FFFFFF' }, // Letra blanca
    };
  });

  // Agrega los datos filtrados a la hoja de cálculo
  worksheet.addRows(filteredData);


  // Aplicar bordes a todas las celdas de la tabla
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });
  // Crea el archivo Excel
  workbook.xlsx.writeBuffer().then(buffer => {
    try {
      if (buffer && buffer.length > 0) {
        // Descarga el archivo Excel en el navegador
        saveAs(new Blob([buffer]), 'MembresiaIpuc.xlsx');
      } else {
        console.error('El archivo Excel está vacío.');
      }
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error);
    }
  });
};



</script>
