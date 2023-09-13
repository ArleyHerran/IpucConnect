<template>
    
              <!-- Diálogo de Registro/Edit -->
              <v-dialog v-model="estados.FormmMiembros.display" max-width="600">
                <v-card>
                  <v-card-title>{{ editMode ? 'Editar Miembro' : 'Registrar Miembro' }}</v-card-title>
                  <v-card-text>
                    <v-form ref="form" @submit="saveMember">
                      <!-- Campos del formulario -->
                      <!-- Número de documento -->
                      <v-text-field v-model="formData.numeroDocumento" label="Número de documento" type="number"></v-text-field>
  
                      <!-- Nombre y Apellido -->
                      <v-row>
                        <v-col cols="6">
                          <v-text-field v-model="formData.nombre" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field v-model="formData.apellido" label="Apellido"></v-text-field>
                        </v-col>
                      </v-row>
  
                      <!-- Rol -->
                      <v-select v-model="formData.rol" :items="['Pastor', 'Miembro']" label="Rol"></v-select>
  
                      <!-- Fecha de nacimiento -->
                      <div class="date-input">
                      <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                      <input type="date" v-model="formData.fechaNacimiento" id="fechaNacimiento" />
                    </div>
                      <!-- Celular -->
                      <v-text-field v-model="formData.celular" label="Celular" type="number"></v-text-field>
  
                      <!-- Dirección -->
                      <v-text-field v-model="formData.direccion" label="Dirección"></v-text-field>
  
                      <!-- Sexo -->
                      <v-radio-group v-model="formData.sexo" label="Sexo">
                        <v-radio label="Hombre" value="Hombre"></v-radio>
                        <v-radio label="Mujer" value="Mujer"></v-radio>
                      </v-radio-group>
  
                      <!-- Estado Civil -->
                      <v-select v-model="formData.estadoCivil" :items="['Casado', 'Soltero']" label="Estado Civil"></v-select>
  
                      <!-- ¿Es usted bautizado? -->
                      <v-radio-group v-model="formData.esBautizado" label="¿Es usted bautizado?">
                        <v-radio label="Sí" value="Sí"></v-radio>
                        <v-radio label="No" value="No"></v-radio>
                      </v-radio-group>
  
                      <!-- Si es bautizado (mostrar) -->
                    
                      <div class="date-input" v-if="formData.esBautizado === 'Sí'">
                      <label for="fechaNacimiento">Fecha de bautismo:</label>
                      <input type="date" v-model="formData.fechaBautismo" id="fechaNacimiento" />
                    </div>
                      <v-text-field v-if="formData.esBautizado === 'Sí'" v-model="formData.nombrePastorBautismo" label="Nombre del pastor que lo bautizó"></v-text-field>
                      <v-textarea  v-model="formData.referenciaPastoral" label="Referencia Pastoral"></v-textarea>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="primary" @click="saveMember">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          
  </template>
  <script setup>
  import { ref, reactive } from 'vue';
  import { useAppStore } from "../store/app";
  import { collection, addDoc  } from "firebase/firestore"; 
  import { auth, db } from "../ConfigFirebase";
  const estados = useAppStore();
  
  const dialog = ref(false);
  const editMode = ref(false);
  
  const formData = reactive({
    idSedeCongregacion:"",
    distrito:"",
    zona:"",
    municipio:"",
    solicitudTraslado:null,
    datosRegistro:{fecha:new Date().toISOString() ,sede:'',pastor:""},
    historiaTraslados:[],
    numeroDocumento: "",
    nombre: "",
    apellido: "",
    rol: "",
    fechaNacimiento: null,
    celular: "",
    direccion: "",
    sexo: "",
    estadoCivil: "",
    esBautizado: "No",
    fechaBautismo: null,
    nombrePastorBautismo: "",
    referenciaPastoral: ""

  });
  
  const saveMember = async () => {
    // Lógica para guardar o actualizar un miembro
    // Accede a los datos del formulario a través de formData
    // ...
    console.log(formData.value);
   

// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "Membresia"), {
  name: "Tokyo",
  country: "Japan"
});
console.log("Document written with ID: ", docRef.id);
  }


  </script>
  
  
  <style scoped> 
  /* Estilos personalizados según tus necesidades */
  .date-input {
  margin-bottom: 16px; /* Agrega margen inferior para separar de otros campos */
}
  .date-input {
  display: flex;
  flex-direction: column; /* Muestra el label encima del input */
  margin-bottom: 16px; /* Agrega margen inferior para separar de otros campos */
}

.date-input label {
  font-weight: bold; /* Hace que el label sea negrita como los otros campos */
  margin-bottom: 4px; /* Agrega espacio entre el label y el input */
}

.date-input input {
  width: 100%;
  height: 40px; /* Altura igual a otros campos */
  border: 1px solid #ccc; /* Color de borde igual a otros campos */
  border-radius: 4px; /* Borde redondeado igual a otros campos */
  padding: 6px 8px; /* Espaciado igual a otros campos */
}
  </style>
  