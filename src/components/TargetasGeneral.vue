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
        <v-card dark> </v-card>
        <v-card :color="item.color" theme="dark">
          <div class="d-flex flex-no-wrap ">
            <!-- Agrega el componente v-icon con la clase y el icono adecuados -->
            <v-icon
             
              class="ma-3"
              size="50"
              rounded="0"
              >{{ item.icon }}</v-icon
            >
            <div>
              <v-card-title class="text-h5">
                {{ item.title }}
              </v-card-title>

              <v-card-subtitle class="text-h5">{{ item.value }}    <span style="font-size: 12px; right: 0px;font-weight: bold;">({{ item.char }}%)</span> </v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
   
    
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useAppStore } from "../store/app";


const estados = useAppStore();

// Define un mapeo de categorías a clases de iconos y nombres de iconos


// Función para obtener la clase del icono
function getIconClass(category) {
  return categoryIcons[category] || ""; // Devuelve la clase del icono correspondiente o una cadena vacía si no se encuentra
}


const items = ref([
  { title: "Total", color: "blue", value: 0, char:100,icon:"mdi-account-group"},
  { title: "Hombres", color: "#385F73", value: 0,char:0,icon:"mdi-gender-male"},
  { title: "Mujeres", color: "pink", value: 0 ,char:0,icon:"mdi-gender-female"},
  { title: "Niños", color: "green", value: 0,char:0,icon:"mdi-human-child" },
  { title: "Adolescentes", color: "#952175", char:0,value: 0,icon:"mdi-human-male"},
  { title: "Jóvenes", color: "#FF5722", value: 0,char:0,icon:"mdi-human-male-female" },
  { title: "Adultos", color: "#8C9EFF", value: 0,char:0,icon:"mdi-human-male-female" },
  { title: "Adultos mayores", color: "brown", char:0,value: 0,icon:"mdi-human-cane" },
  { title: "Casados", color: "#385F73", value: 0,char:0,icon:"mdi-account-heart" },
  { title: "Solteros", color: "#1F7087", value: 0,char:0,icon:"mdi-heart-broken" },
]);

watch(
  () => estados.miembros,
  (newVal, oldVal) => {
    getData(newVal);
  }
);

onMounted(() => {
  // Código para configurar la barra fija
  getData(estados.miembros);
});

function getData(data) {
  // Reinicializar los valores a 0
  items.value.forEach((item) => {
    item.value = 0;
  });

  // Calcular la cantidad de miembros en cada categoría y sumar edades
  data.forEach((miembro) => {
    items.value[0].value++; // Total
    if (miembro.sexo === "Hombre") {
      items.value[1].value++; // Hombres
    } else if (miembro.sexo === "Mujer") {
      items.value[2].value++; // Mujeres
    }

    // Calcular la edad a partir de la fecha de nacimiento
    const fechaNacimiento = new Date(miembro.fechaNacimiento);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();

    if (edad < 12) {
      items.value[3].value++; // Niños
    } else if (edad >= 12 && edad < 18) {
      items.value[4].value++; // Adolescentes
    } else if (edad >= 18 && edad <= 35) {
      items.value[5].value++; // Jóvenes
    } else if (edad >= 35 && edad <= 60) {
      items.value[6].value++; // Ancianos
    } else {
      items.value[7].value++; // Adultos mayores
    }

    if (miembro.estadoCivil === "Casado/a") {
      items.value[8].value++; // Hombres
    } else if (miembro.estadoCivil === "Soltero/a") {
      items.value[9].value++; // Mujeres
    }
  });
  for (let i = 1; i <= 9; i++) {
  items.value[i].char = ((items.value[i].value / items.value[0].value) * 100).toFixed(1);
}
 // (7 / 10) * 100 = 70%
}



</script>




