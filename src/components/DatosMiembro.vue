<template>
  <v-container>
    <v-row>
      <!--
      <v-col cols="12" md="4">

      
          v-model="selectedDocumentType"
          :items="documentTypes"
          label="Tipo de Documento"
        ></v-select>
        
     
      </v-col>
    -->

      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchNumber"
          label="Número de Documento"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn
          @click="buscar"
          :loading="loadingb"
          class="flex-grow-1"
          height="48"
          variant="flat"
          color="success"
          >Buscar</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="formData.numeroDocumento !== ''">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Información Personal</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <strong>Tipo de Documento:</strong>
                  {{ formData.tipoDocumento }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <strong>Número de Documento:</strong>
                  {{ formData.numeroDocumento }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <strong>Nombre:</strong> {{ formData.nombre }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <strong>Apellido:</strong> {{ formData.apellido }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <strong>Rol:</strong> {{ formData.rol }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <strong>Fecha de Nacimiento:</strong>
                  {{ formData.fechaNacimiento }}
                </v-list-item-content>
              </v-list-item>
              <!-- Agrega más campos de información personal aquí -->
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Información de Contacto</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <strong>Celular:</strong> {{ formData.celular }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <strong>Dirección:</strong> {{ formData.direccion }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <strong>Sexo:</strong> {{ formData.sexo }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <strong>Estado Civil:</strong> {{ formData.estadoCivil }}
                </v-list-item-content>
              </v-list-item>
              <!-- Agrega más campos de información de contacto aquí -->
              <v-list-item>
                <v-list-item-content>
                  <v-btn
                    :disabled="formData.solicitudTraslado != null"
                    @click="load"
                    :loading="loading"
                    class="flex-grow-1"
                    height="48"
                    variant="flat"
                    color="success"
                  >
                    <v-icon left>mdi-send</v-icon> Solicitar Traslado
                  </v-btn>
                  <!-- Tooltip para mostrar el mensaje -->
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <span
                        v-on="on"
                        v-if="formData.tipoDocumento === '314'"
                        style="color: rgb(240, 103, 103)"
                        >El botón se desactivó porque ya tiene una
                        solicitud</span
                      >
                    </template>
                  </v-tooltip>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Puedes agregar más secciones para la información adicional si es necesario -->
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";
const loading = ref(false);
const loadingb = ref(false);
const searchNumber = ref("");
const documentTypes = [
  "Cedula de Ciudadania",
  "Targeta de identidad",
  "Registro Civil",
  "Cedula Extrangera",
];

const formData = reactive({
  tipoDocumento: "314",
  numeroDocumento: "",
  nombre: "Juan",
  apellido: "Pérez",
  rol: "Usuario",
  fechaNacimiento: "1990-01-15",
  celular: "123-456-789",
  direccion: "Calle Principal 123",
  sexo: "Masculino",
  estadoCivil: "Soltero",
  esBautizado: "Sí",
  fechaBautismo: "2010-06-20",
  nombrePastorBautismo: "Pastor Juan",
  referenciaPastoral: "Iglesia de la Comunidad",
  solicitudTraslado:null,
});

function load() {
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
}
function buscar() {
    formData.numeroDocumento="";
  
  loadingb.value = true;
  setTimeout(() => {
    getFirebase();
   
  }, 2000);
}

async function getFirebase() {
  const q = query(
    collection(db, "Membresia"),
    where("numeroDocumento", "==", searchNumber.value)
  );

  const querySnapshot = await getDocs(q);
  let documentoEncontrado = false;
  querySnapshot.forEach((doc) => {
    documentoEncontrado = true; // Se encontró al menos un documento
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const docData = doc.data();
    for (const key in formData) {
  if (docData.hasOwnProperty(key)) {
    formData[key] = docData[key]; // Asigna el valor de doc.data() a formData si existe el campo correspondiente
  }
}
  });

  // Verifica si se encontró algún documento
if (!documentoEncontrado) {
  console.log("No se encontraron documentos con el número de documento especificado.");
  // Aquí puedes manejar la lógica correspondiente, como mostrar un mensaje de error.
}else{
   
}

loadingb.value = false;





}
</script>
