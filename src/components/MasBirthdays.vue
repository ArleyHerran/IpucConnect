<template>
    <main>
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-sheet elevation="0" class="py-4 px-1 overflow-x-auto">
    <v-chip-group mandatory selected-class="text-primary" filter v-model="monthSelect">
      <v-chip v-for="tag in months" :key="tag.value" @click="mesFil(tag.value)">
        {{ tag.label }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
      </v-col>
    </v-row>
    <v-card class="mx-auto" max-width="100%">
    <v-card-title> {{meses[monthSelect].charAt(0).toUpperCase() + meses[monthSelect].slice(1)}} </v-card-title>

    <v-list lines="one">
      <v-list-item
        v-for="per in nextBirthday"
        :key="per.nombre"
        :title="per.nombre"
        :subtitle="per.edad"
        lines="three"
      >
        <template v-slot:prepend>
          <v-avatar :color="per.color">
            <v-icon color="white">{{ per.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-calendar-clock" variant="text"></v-btn>
        </template>
        <v-divider ></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</main>
  </template>
  <script setup>
   import { ref, onMounted, watch } from 'vue';
  import { useAppStore } from "../store/app";
const estados = useAppStore();
const nextBirthday=ref([]);
const monthSelect=ref(new Date().getMonth());
const months = ref([
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' }
]);
const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];


// Función para filtrar personas por mes de nacimiento
function filtrarPorMes(personas, mes) {
  const personasFiltradas = personas.filter(persona => {
    const partes = persona.fechaNacimiento.split('-');
    return parseInt(partes[1]) === mes;
  });

  return personasFiltradas;
}


watch(() => estados.birthday, (newValue, oldValue) => {
  
  mesFil(new Date().getMonth()+1);
});

function mesFil(month) {
  monthSelect.value=month-1;

  const resultadoFil = filtrarPorMes(estados.birthday, month);
  const personas=[];
  for (const persona of resultadoFil) {
    personas.push({
        nombre: persona.nombre,
        icon: persona.sexo === 'Hombre' ? 'mdi-face-man' : 'mdi-face-woman',
        edad: formatearFechaCumpleaños(persona.fechaNacimiento),
        color: persona.sexo === 'Hombre' ? 'blue-grey-lighten-3' : 'pink-lighten-3'
      });
    
  }

  // Utilizar la propiedad correcta (edad) en la función de comparación
  personas.sort((a, b) => {
    const fechaA = convertirFecha(a.edad);
    const fechaB = convertirFecha(b.edad);

    return fechaA - fechaB;
  });

nextBirthday.value=personas;

}

function formatearFechaCumpleaños(fecha) {
const partes = fecha.split('-');
return parseInt(partes[2])+" de "+meses[parseInt(partes[1])-1];
}
// Función para convertir el formato de fecha a un objeto Date
function convertirFecha(fecha) {

  const partes = fecha.split(' ');
  const dia = parseInt(partes[0], 10);
  const mes = partes[2]; // El mes en formato de texto
  const mesNumero = meses.indexOf(mes); // Obtener el índice del mes
  const añoActual = new Date().getFullYear(); // Asumiendo el año actual

  return new Date(añoActual, mesNumero, dia);
}


onMounted(() => {
  mesFil(new Date().getMonth()+1);
});


  </script>