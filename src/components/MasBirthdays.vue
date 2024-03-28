<template>
  <main>
  
        <v-sheet  class="py-4 px-1 overflow-x-auto elevation-2" color="transparent">
          <v-chip-group
          mandatory
            filter
            v-model="monthSelect"
            
          >
            <v-chip
              v-for="tag in months"
              :key="tag.value"
              @click="mesFil(tag.value)"
              :color="tag.color"
              class=" elevation-2"
            >
              {{ tag.label }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
    
    <v-card class="mx-auto mb-7" max-width="100%" color="transparent">
      <v-card-title>
        {{
          meses[monthSelect]
        }}
      </v-card-title>

      <v-list lines="one" style="background:transparent;">
        <v-list-item
          v-for="per in nextBirthday"
          :key="per.nombre"
          :title="per.nombre"
          :subtitle="per.edad"
          class=" elevation-5"
          style="padding:10px;  border-radius: 10px ;  color:black; background:white;  margin-top: 12px; margin-left: 10px; margin-right: 10px;"
        >
          <template v-slot:prepend>
            <v-avatar color="#212F3C" class=" elevation-5">
              <v-icon :color="per.color">{{ per.icon }}</v-icon>
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-btn
              color="blue"
              icon="mdi-calendar-clock"
              variant="text"
              class=" elevation-2"
            ></v-btn>
          </template>
          
        </v-list-item>
      </v-list>
    </v-card>
  </main>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useAppStore } from "../store/app";
const estados = useAppStore();
const nextBirthday = ref([]);
const monthSelect = ref(new Date().getMonth());
const months = ref([
  { value: 1, label: "Enero", color: 'blue' },
  { value: 2, label: "Febrero", color: 'green' },
  { value: 3, label: "Marzo", color: '#CA6F1E' },
  { value: 4, label: "Abril", color: 'red' },
  { value: 5, label: "Mayo", color: 'orange' },
  { value: 6, label: "Junio", color: 'purple' },
  { value: 7, label: "Julio", color: 'cyan' },
  { value: 8, label: "Agosto", color: 'pink' },
  { value: 9, label: "Septiembre", color: 'teal' },
  { value: 10, label: "Octubre", color: 'deep-purple' },
  { value: 11, label: "Noviembre", color: 'brown' },
  { value: 12, label: "Diciembre", color: 'indigo' },
]);
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Función para filtrar personas por mes de nacimiento
function filtrarPorMes(personas, mes) {
  const personasFiltradas = personas.filter((persona) => {
    const partes = persona.fechaNacimiento.split("-");
    return parseInt(partes[1]) === mes;
  });

  return personasFiltradas;
}

watch(
  () => estados.birthday,
  (newValue, oldValue) => {
    mesFil(new Date().getMonth() + 1);
  }
);

function mesFil(month) {
  monthSelect.value = month - 1;

  const resultadoFil = filtrarPorMes(estados.birthday, month);
  const personas = [];
  for (const persona of resultadoFil) {
    personas.push({
      nombre: persona.nombre,
      icon: persona.sexo === "Hombre" ? "mdi-face-man" : "mdi-face-woman",
      edad: formatearFechaCumpleaños(persona.fechaNacimiento),
      color:
        persona.sexo === "Hombre" ? "#2ECC71" : "#F0B27A",
    });
  }

  // Utilizar la propiedad correcta (edad) en la función de comparación
  personas.sort((a, b) => {
    const fechaA = convertirFecha(a.edad);
    const fechaB = convertirFecha(b.edad);

    return fechaA - fechaB;
  });

  nextBirthday.value = personas;
}

function formatearFechaCumpleaños(fecha) {
  const partes = fecha.split("-");
  return parseInt(partes[2]) + " de " + meses[parseInt(partes[1]) - 1];
}
// Función para convertir el formato de fecha a un objeto Date
function convertirFecha(fecha) {
  const partes = fecha.split(" ");
  const dia = parseInt(partes[0], 10);
  const mes = partes[2]; // El mes en formato de texto
  const mesNumero = meses.indexOf(mes); // Obtener el índice del mes
  const añoActual = new Date().getFullYear(); // Asumiendo el año actual

  return new Date(añoActual, mesNumero, dia);
}

onMounted(() => {
  mesFil(new Date().getMonth() + 1);
});
</script>
