<template>
    <div >
     
      <v-carousel v-model="model">
      <v-carousel-item
        v-for="(month, i) in months"
        :key="month"
        :value="i"
      >
        <v-sheet
          :color="colors[i % colors.length]"
          height="100%"
          tile
        >
          <div class="floating-text">
            <div class="text-h2">
              {{ month }}
            </div>
            <ul>
              <li v-for="person in getBirthdaysInMonth(i)" :key="person.nombre">
                {{ person.nombre }}
                <span v-if="isBirthdayToday(person.fechaNacimiento)"> (Hoy es su cumpleaños)</span>
              </li>
            </ul>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    </div>
  </template>
  
  <script setup>
import { ref,watch,reactive} from 'vue';
import { useAppStore } from "../store/app";
const estados = useAppStore();
const currentMonth = new Date().getMonth();
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

var personas = [
  
  // Agrega más personas aquí...
];

const colors = ref([
  'primary',
  'secondary',
  'yellow darken-2',
  'red',
  'orange',
]);

const model = ref(currentMonth);

const prevMonth = () => {
  model.value = (model.value - 1 + 12) % 12; // Circular decrement
};

const nextMonth = () => {
  model.value = (model.value + 1) % 12; // Circular increment
};

const getBirthdaysInMonth = (monthIndex) => {
  return estados.birthday.filter((person) => {
    const [year, month, day] = person.fechaNacimiento.split('-').map(Number);
    return month === monthIndex + 1;
  });
};

const isBirthdayToday = (fechaNacimiento) => {
  const [year, month, day] = fechaNacimiento.split('-').map(Number);
  const today = new Date();
  return today.getMonth() + 1 === month && today.getDate() === day;
};




</script>
  <style scoped>
  .floating-text {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
  }
  </style>