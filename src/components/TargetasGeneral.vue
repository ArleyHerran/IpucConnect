<template>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card :color="item.color" dark>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.value }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, watch,onMounted  } from 'vue';
  import { useAppStore } from "../store/app";
  const estados = useAppStore();
  
  const items = ref([
  { title: 'Total', color: 'blue', value: 0 },
    { title: 'Hombres', color: 'blue', value: 0 },
    { title: 'Mujeres', color: 'pink', value: 0 },
    { title: 'Niños', color: 'green', value: 0 },
    { title: 'Adolescentes', color: 'orange', value: 0 },
    { title: 'Jóvenes', color: 'purple', value: 0 },
    { title: 'Adultos', color: 'brown', value: 0 },
    { title: 'Adultos mayores', color: 'brown', value: 0 },
    { title: 'Casados', color: 'brown', value: 0 },
    { title: 'Solteros', color: 'brown', value: 0 },
  ]);
  
  watch(() => estados.miembros, (newVal, oldVal) => {
    getData(newVal);
  });
  onMounted(() => {
  // Código para configurar la barra fija
  getData(estados.miembros);
});

  function getData(data){
 // Reinicializar los valores a 0
 items.value.forEach(item => {
      item.value = 0;
    });
  
    // Calcular la cantidad de miembros en cada categoría y sumar edades
    data.forEach(miembro => {
        items.value[0].value++; // Total
      if (miembro.sexo === 'Hombre') {
        items.value[1].value++; // Hombres
      } else if (miembro.sexo === 'Mujer') {
        items.value[2].value++; // Mujeres
      }
  
      // Calcular la edad a partir de la fecha de nacimiento
      const fechaNacimiento = new Date(miembro.fechaNacimiento);
      const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
      
      if (edad < 12) {
        items.value[3].value++; // Niños
      } else if (edad >=12 &&edad < 18) {
        items.value[4].value++; // Adolescentes
      } else if (edad >= 18&&edad <= 35) {
        items.value[5].value++; // Jóvenes
      } else if(edad >= 35&&edad <= 60) {
        items.value[6].value++; // Ancianos
      }else{
        
        items.value[7].value++; // Adultos mayores
      }

      if (miembro.estadoCivil === 'Casado/a') {
        items.value[8].value++; // Hombres
      } else if (miembro.estadoCivil === 'Soltero/a') {
        items.value[9].value++; // Mujeres
      }
    });
  }
  </script>
  
  