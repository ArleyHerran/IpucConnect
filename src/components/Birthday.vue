<template>
  <v-card class="mx-auto elevation-0" max-width="100%"  color="transparent">
    <v-img
      src="../img/bg-2.jpeg"
      height="150px"
      class="align-end"
      gradient="to bottom, rgba(0, 0,0,.1), rgba(0, 0, 0,.3)"
      cover

    >
      <v-card-title class="text-white"><h2>{{ new Date().getDate() }} de {{ new Date().toLocaleString('default', { month: 'long' }) }}</h2></v-card-title>
    </v-img>
    <v-card-title v-if="birthdayToday.length >=1">Cumpleaños de hoy</v-card-title>
  </v-card>
  <v-card class="mx-auto elevation-0" max-width="100%"  color="transparent">
    <v-list lines="one" style="background:transparent;">
      <v-list-item
        v-for="file in birthdayToday"
        :key="file.nombre"
        :title="file.nombre "
        :subtitle="file.edad"
        style=" border-radius: 10px ;  color:white; background:#ED9AF8;  margin-top: 8px; margin-left: 10px; margin-right: 10px;"
        class=" elevation-2"
      >
        <template v-slot:prepend>
          <v-avatar color="#212F3C">
            <v-icon :color="file.color">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn color="black" icon="mdi-cake-variant-outline" variant="text"></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
  <v-divider></v-divider>
  <v-card class="mx-auto" max-width="100%" color="transparent">
    <v-card-title> Próximos Cumpleaños </v-card-title>

    <v-list lines="one" style="background:transparent;">
      <v-list-item
        v-for="cumple in nextBirthday"
        :key="cumple.nombre"
        :title="cumple.nombre"
        :subtitle="cumple.edad"
        class=" elevation-2"
        style=" border-radius: 10px ;  color:black; background:white;  margin-top: 8px; margin-left: 10px; margin-right: 10px;"
      >
        <template v-slot:prepend>
          <v-avatar color="#212F3C">
            <v-icon :color="cumple.color">{{ cumple.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn color="blue" icon="mdi-calendar-clock" variant="text"></v-btn>
        </template>
      
      </v-list-item>
    </v-list>
   
  </v-card>
</template>



<script setup>

import { ref, onMounted, watch } from 'vue';
import { useAppStore } from "../store/app";
const estados = useAppStore();


const birthdayToday=ref([]);
const nextBirthday=ref([]);
const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

const verificarCumpleaños = (c) => {
  birthdayToday.value=[];
  for (const i in c) {
    isBirthdayToday(c[i].fechaNacimiento,c[i]);
  }
};

const isBirthdayToday = (fechaNacimiento,persona) => {
  const [year, month, day] = fechaNacimiento.split('-').map(Number);
  const today = new Date();
 
  if(today.getMonth() + 1 === month && today.getDate() === day){
    
    birthdayToday.value.push({
        color: persona.sexo === 'Hombre' ? "#2ECC71" : "#F0B27A",
        icon: persona.sexo === 'Hombre' ? 'mdi-face-man' : 'mdi-face-woman',
        edad: calcularEdad(persona.fechaNacimiento)+' años',
        nombre: persona.nombre,
      },);
  }
};



/*
watch(estados.birthday, (newValue, oldValue) => {
  console.log(newValue)
  verificarCumpleaños();

  calcularCumpleañosProximos(newValue);
  // Aquí puedes realizar acciones adicionales cuando birthdayToday cambia
});
*/
watch(() => estados.birthday, (newValue, oldValue) => {

  verificarCumpleaños(newValue);
  calcularCumpleañosProximos(newValue);
  // Aquí puedes realizar acciones adicionales cuando birthdayToday cambia
});



async function calcularCumpleañosProximos(personas) {
  const hoy = new Date();
  var nuevosCumpleaños = [];  // Usar un nuevo array local
 
  for (const persona of personas) {
    const fechaNacimiento = new Date(persona.fechaNacimiento);
    const fechaCumpleaños = new Date(hoy.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());

    const diferenciaDias = Math.floor((fechaCumpleaños - hoy) / (1000 * 60 * 60 * 24));

    if (diferenciaDias > -2 && diferenciaDias <= 15) {
      nuevosCumpleaños.push({
        nombre: persona.nombre,
        icon: persona.sexo === 'Hombre' ? 'mdi-face-man' : 'mdi-face-woman',
        edad: formatearFechaCumpleaños(persona.fechaNacimiento),
        color: persona.sexo === 'Hombre' ? "#2ECC71" : "#F0B27A"
      });
    }
  }

  

  // Utilizar la propiedad correcta (edad) en la función de comparación
  nuevosCumpleaños.sort((a, b) => {
    const fechaA = convertirFecha(a.edad);
    const fechaB = convertirFecha(b.edad);
    return fechaA - fechaB;
  });

  nextBirthday.value = nuevosCumpleaños;  // Asignar el nuevo array a nextBirthday.value
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




const calcularEdad = (fn) => {
  const fechaNacimientoArray = fn.split('-');
  const anioNacimiento = parseInt(fechaNacimientoArray[0]);
  const mesNacimiento = parseInt(fechaNacimientoArray[1]) - 1; // Meses en JavaScript son de 0 a 11
  const diaNacimiento = parseInt(fechaNacimientoArray[2]);

  const hoy = new Date();
  const fechaNacimientoDate = new Date(anioNacimiento, mesNacimiento, diaNacimiento);

  let edad = hoy.getFullYear() - anioNacimiento;

  if (
    hoy.getMonth() < mesNacimiento ||
    (hoy.getMonth() === mesNacimiento && hoy.getDate() < diaNacimiento)
  ) {
    edad--;
  }

  return edad;
};

onMounted(()=>{
  verificarCumpleaños(estados.birthday);
  calcularCumpleañosProximos(estados.birthday);
}
 
  )
</script>
