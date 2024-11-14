<template>
  <!-- Diálogo de Registro/Edit -->
  <v-dialog
    v-model="estados.formMiembros.display"
    max-width="600"
    :persistent="true"
  >
    <v-card>
      <v-card-title class="dialog-title">
        {{
          estados.formMiembros.mode == "add"
            ? "Registrar Miembro"
            : estados.formMiembros.mode == "edit"
            ? "Editar Miembro"
            : estados.formMiembros.mode == "view"
            ? "Vista"
            : "Texto por defecto"
        }}
      </v-card-title>

      <v-card-text>
      
  <v-form ref="form" @submit="saveMember">
    <!-- Información Personal -->
    <section>
      <h2>Información Personal</h2>
      <v-row>
        <v-col cols="12" sm="6">
        <v-select
        v-model="formData.tipoDocumento"
        :items="['Cedula de Ciudadania', 'Targeta de identidad', 'Registro Civil', 'Cedula Extrangera']"
        label="Tipo de documento"
      ></v-select>
    </v-col>
      <v-col cols="12" sm="6">

      <v-text-field
        :disabled="estados.formMiembros.mode == 'edit'"
        v-model="formData.numeroDocumento"
        label="Número de documento"
        type="number"
        required
      ></v-text-field>
    </v-col>
      </v-row>
     

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.nombre"
            label="Nombre"
        
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="formData.apellido"
            label="Apellido"
          ></v-text-field>
        </v-col>
      </v-row>
      
     
      <v-row>
        <v-col cols="12" sm="6">
          <v-select
        v-model="formData.rol"
        :items="['Pastor', 'Miembro/Simpatizante']"
        label="Rol"
      ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
        v-model="formData.estado"
        :items="['Activo', 'Inhabilitado']"
        label="Estado"
        :disabled="estados.formMiembros.mode !== 'edit'"
      ></v-select>
        </v-col>
      </v-row>
      
      <div class="date-input">
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          type="date"
          v-model="formData.fechaNacimiento"
          id="fechaNacimiento"
        />
      </div>
    </section>
    
    <!-- Contacto -->
    <section>
      <h2>Contacto</h2>
      <v-text-field
        v-model="formData.celular"
        label="Celular"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="formData.direccion"
        label="Dirección"
      ></v-text-field>

      
    <!-- Cuestionario -->
    <section>
      <h2>Cuestionario</h2>
      <v-select
        v-model="formData.nivelAcademico"
        :items="nivelesAcademicos"
        label="Nivel académico"
      ></v-select>

      <v-radio-group
        v-model="formData.discapacitado"
        label="¿Tiene usted alguna discapacidad?"
      >
        <v-radio label="Sí" value="Sí"></v-radio>
        <v-radio label="No" value="No"></v-radio>
      </v-radio-group>

      <v-select
        v-if="formData.discapacitado === 'Sí'"
        v-model="formData.discapacidad"
        :items="tiposDiscapacidad"
        label="Tipo de discapacidad"
      ></v-select>

      <v-text-field
        v-if="formData.discapacidad === 'Otra'"
        v-model="formData.descripcionDiscapacidad"
        label="Descripcion de Discapacidad"
      ></v-text-field>

      <v-radio-group v-model="formData.sexo" label="Sexo">
        <v-radio label="Hombre" value="Hombre"></v-radio>
        <v-radio label="Mujer" value="Mujer"></v-radio>
      </v-radio-group>
      
      <v-select
        v-model="formData.estadoCivil"
        :items="['Casado/a', 'Soltero/a', 'Viudo/a', 'Divorciado/a']"
        label="Estado Civil"
      ></v-select>
    </section>
   
      <v-radio-group
        v-model="formData.esBautizado"
        label="¿Es usted bautizado/a?"
      >
        <v-radio label="Sí" value="Sí"></v-radio>
        <v-radio label="No" value="No"></v-radio>
      </v-radio-group>

      <div class="date-input" v-if="formData.esBautizado === 'Sí'">
        <label for="fechaBautismo">Fecha de bautismo:</label>
        <input
          type="date"
          v-model="formData.fechaBautismo"
          id="fechaBautismo"
        />
      </div>

      <v-text-field
        v-if="formData.esBautizado === 'Sí'"
        v-model="formData.nombrePastorBautismo"
        label="Nombre del pastor que lo bautizó"
      ></v-text-field>

      <v-radio-group
        v-model="formData.espiritu"
        label="¿Es usted sellado/a con el Espiritu Santo?"
      >
        <v-radio label="Sí" value="Sí"></v-radio>
        <v-radio label="No" value="No"></v-radio>
      </v-radio-group>
    </section>
    
    <!-- Cargos -->
    <section>
      <h2>Infromacion pastoral</h2>
      <v-text-field v-model="cargo.text" label="Cargo" required>
        <template #append>
          <v-btn
            :loading="isLoading"
            class="flex-grow-1"
            height="48"
            :color="cargo.text !== '' ? 'success' : ''"
            @click="agregarCargo"
          >
            <v-icon icon="mdi-check"></v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <v-chip-group filter>
        <v-chip
          v-for="(cargo, index) in formData.cargos"
          :key="index"
          :color="index === editedIndex ? editedColor : ''"
        >
          {{ cargo.text }}
          <v-icon @click="eliminarCargo(index)">mdi-close</v-icon>
        </v-chip>
      </v-chip-group>
    </section>

    <v-textarea
      v-model="formData.referenciaPastoral"
      label="Referencia Pastoral"
      counter="500"
    ></v-textarea>
  </v-form>

      </v-card-text>
      <v-card-actions class="dialog-actions">
        <v-spacer />
        <v-btn @click="estados.formMiembros.display = false" style="text-transform: none">
          {{
            estados.formMiembros.mode === "view" ? "Cerrar" : "Cancelar"
          }}</v-btn
        >
        <v-btn
          color="primary"
          @click="saveMember"
          v-if="estados.formMiembros.mode !== 'view'"
          :disabled="btnSave"
          style="text-transform: none"
        >
          {{
            estados.formMiembros.mode === "add" ? "Guardar" : "Guardar Cambios"
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useAppStore } from "../store/app";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  getDocs,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";
import swal from "sweetalert";
const estados = useAppStore();

const btnSave = ref(false);
const editMode = ref(false);

const dataDefault = reactive({
  sede: "",
  datosRegistro: {
    timestamp: serverTimestamp(),
    sede: {},
  },
  historiaTraslados: [],
});

const formData = reactive({
  estado:"Activo",
  tipoDocumento: "",
  numeroDocumento: "",
  nombre: "",
  apellido: "",
  rol: "",
  fechaNacimiento: "",
  celular: "",
  direccion: "",
  nivelAcademico: "",
  discapacitado:"",
  discapacidad:"",
  descripcionDiscapacidad:"",
  sexo: "",
  estadoCivil: "",
  esBautizado: "",
  fechaBautismo: "",
  nombrePastorBautismo: "",
  espiritu:"",
  cargos: [],
  historiaCargos:[],
  referenciaPastoral: "",
  
});

const nivelesAcademicos = [
  "Educación No aplica",
  "Educación Básica Primaria",
  "Educación Básica Secundaria",
  "Educación Media o Bachillerato",
  "Educación Técnica",
  "Educación Tecnológica",
  "Formación Profesional",
  "Sin Educación (No sabe leer)",
];

const tiposDiscapacidad = [
  "Física",
  "Visual",
  "Auditiva",
  "Intelectual",
  "Otra",
];
// Usamos watch para observar cambios en estados.data y actualizar formData
watch(
  () => estados.data,
  (newData) => {
    actualizarFormData(newData);
  }
);

watch(
  () => estados.formMiembros,
  (newData) => {
    if (
      newData.mode == "view" ||
      (newData.mode == "edit" && newData.id != "")
    ) {
      // Utiliza el método find para buscar el objeto por su ID
      const objet1 = estados.miembros.find(
        (objeto) => objeto.id === newData.id
      );
      
      for (const prop in formData) {
        if (objet1.hasOwnProperty(prop)) {
          formData[prop] = objet1[prop];
        }
      }
    } else {
      clearFormFields();
      formData.estado='Activo'
    }
  }
);
const actualizarFormData = (newData) => {
  if (newData) {
    dataDefault.sede = auth.currentUser.email;
    dataDefault.datosRegistro.sede = newData;

    // También puedes actualizar otras propiedades aquí si es necesario
  }
};

// Ejecutar cuando el componente se monta
onMounted(() => {
  actualizarFormData(estados.data);
});
// Definimos una función para actualizar dataDefault

const saveMember = async () => {
  const miembro = { ...dataDefault, ...formData };
  //console.log(JSON.parse(JSON.stringify(miembro)));
  alert("voy")
  if (!validateForm(miembro)) return;
   btnSave.value=true;
   estados.progre=true;
  if (estados.formMiembros.mode === "add") {
    const resultado = await buscarV(miembro.numeroDocumento);
    if (resultado) return;
    guardarRegistro(miembro);
  } else {
    editar();
  }
};

//Permite guardar el registro por primera vez en firebase
async function guardarRegistro(d) {
  try {
    
    const docRef= await setDoc(doc(db, "Membresia", d.numeroDocumento), d);
    clearFormFields();
    estados.progre=false;
    btnSave.value=false;
    estados.formMiembros = { display: false, mode: "", id: "" };
    // Muestra un mensaje de confirmación si se guardó correctamente
    swal("Éxito!", "El registro se ha guardado correctamente.", "success");
   
   
  } catch (error) {
    // Muestra un mensaje de error si hubo un problema al guardar
    estados.progre=false;
    btnSave.value=false;
    swal(
      "Error!",
      "Hubo un problema al guardar el registro en Firebase." + error,
      "error"
    );
  }
}
//Permite guardar modificacion de cualquier miembro
async function editar() {
  try {
    const miembro = doc(db, "Membresia", estados.formMiembros.id);
 

//console.log(  {...formData})
    await updateDoc(miembro, formData);
    estados.progre=false;
    btnSave.value=false;
    clearFormFields();
    estados.formMiembros = { display: false, mode: "", id: "" };
    // Muestra un mensaje de confirmación si se actualizó correctamente
    swal("Éxito!", "El registro se ha actualizado correctamente.", "success");
  } catch (error) {
    // Muestra un mensaje de error si hubo un problema al actualizar
    estados.progre=false;
    btnSave.value=false;
    swal(
      "Error!",
      "Hubo un problema al actualizar el registro en Firebase.",
      "error"
    );
  }
}

//FUNCIONES

function clearFormFields() {
  for (const key in formData) {
  if (Array.isArray(formData[key])) {
    formData[key] = [];
  } else if (typeof formData[key] === 'string') {
    // Mantener el valor actual si la clave es "estado"
    if (key !== 'estado') {
      formData[key] = '';
    }
  } else if (typeof formData[key] === 'number') {
    formData[key] = null;
  }
}

}

function validateForm(d) {
  const showError = (message) => {
    swal("Error!", message, "error");
    return false;
  };

  const showWarning = (message) => {
    swal("Informacion!", message, "warning");
    return false;
  };

  if (
    !d.sede
 
  ) {
    return showError("Error desconocido.");
  }

  if (!d.tipoDocumento || d.tipoDocumento.length > 30) {
    return showWarning(
      "El campo Tipo de documento no puede quedar vacío o tener más de 30 caracteres."
    );
  }

  if (!d.numeroDocumento || d.numeroDocumento.length > 30) {
    return showWarning(
      "El campo número de documento no puede quedar vacío o tener más de 30 caracteres."
    );
  }

  if (!d.nombre || d.nombre.length > 40) {
    return showWarning(
      "El campo nombre no puede quedar vacío o tener más de 40 caracteres."
    );
  }

  if (!d.apellido || d.apellido.length > 40) {
    return showWarning(
      "El campo apellido no puede quedar vacío o tener más de 40 caracteres."
    );
  }

  if (!d.rol || d.rol.length > 40) {
    return showWarning("El campo rol no puede quedar vacío.");
  }

  if (!d.fechaNacimiento) {
    return showWarning("El campo fecha de nacimiento no puede quedar vacío.");
  }

  if (!d.celular || d.celular.length > 16) {
    return showWarning(
      "El campo celular no puede quedar vacío o tener más de 16 caracteres."
    );
  }

  if (!d.direccion || d.direccion.length > 60) {
    return showWarning(
      "El campo dirección no puede quedar vacío o tener más de 60 caracteres."
    );
  }
  if (!d.nivelAcademico) {
    return showWarning(
      "El campo nivel academico debe ser completado"
    );
  }

  if (!d.discapacitado) {
    return showWarning(
      "El campo ¿Tiene usted alguna discapacidad? debe ser completado"
    );
  }

  if (d.discapacitado === "Sí") {
    if (!d.discapacidad) {
      return showWarning("El campo Tipo de discapacidad no puede quedar vacío.");
    }

    if (d.discapacidad === "Otra") {
      if (!d.descripcionDiscapacidad || d.descripcionDiscapacidad.length > 100) {
      return showWarning(
        "El campo Descripcion de discapacidad no puede quedar vacío o tener más de 10 caracteres."
      );
    }
    }
  } else {
  
  }

  if (!d.sexo) {
    return showWarning("El campo sexo no puede quedar vacío.");
  }

  if (!d.estadoCivil) {
    return showWarning("El campo estado civil no puede quedar vacío.");
  }

  if (!d.esBautizado) {
    return showWarning("El campo ¿Es usted bautizado? no puede quedar vacío.");
  }

  if (d.esBautizado === "Sí") {
    if (!d.fechaBautismo) {
      return showWarning("El campo fecha bautismo no puede quedar vacío.");
    }

    if (!d.nombrePastorBautismo || d.nombrePastorBautismo.length > 50) {
      return showWarning(
        "El campo nombre del pastor que le bautizó no puede quedar vacío o tener más de 50 caracteres."
      );
    }
  } else {
    d.fechaBautismo = "";
    d.nombrePastorBautismo = "";
  }


  if (!d.espiritu) {
    return showWarning("El campo ¿Es usted sellado/a con el Espiritu Santo? no puede quedar vacío.");
  }

  //console.log()
  if (d.referenciaPastoral.length > 500) {
      return showWarning(
        "El campo referencia pastoral no puede  tener más de 400 caracteres."
      );
    }

  return true;
}

watch(
  () => formData,
  (newData) => {
   

    if (newData.discapacitado === "No") {
      formData.discapacidad = "";
      formData.descripcionDiscapacidad = "";
    }

    if (newData.discapacidad !== "Otra") {
      formData.descripcionDiscapacidad = "";
    }

    if (newData.esBautizado === "No") {
      formData.fechaBautismo = null;
      formData.nombrePastorBautismo = "";
    }
  },
  { deep: true } // Utiliza el option 'deep' para rastrear cambios en propiedades internas
);
async function buscarV(n) {
  const q = query(
    collection(db, "Membresia"),
    where("numeroDocumento", "==", n)
  );
  const querySnapshot = await getDocs(q);
  // Verifica si se encontró algún documento
  if (querySnapshot.empty) {
    return false; // No se encontraron documentos
  } else {
    estados.progre=false;
    btnSave.value=false;
    swal(
      "Error!",
      "Ya existe un registro con este número de documento!",
      "error"
    );
   
    return true; // Se encontró al menos un documento
 
  }
}

var cargo = reactive({text:"",isDelet:true,color:"green",fecha:new Date()});
const editedIndex = ref(-1); // Variable para controlar el índice editado
const editedColor = "green"; // Color para la nueva chip


const isLoading = ref(false);
const agregarCargo = () => {
  isLoading.value = true; // Activar la carga al hacer clic en el icono

  setTimeout(() => {
    if (cargo.text.trim() !== "") {
      const nuevoCargo = { ...cargo }; // Crear una copia independiente de cargo
  
  formData.cargos.unshift(nuevoCargo); // Agregar al principio del array
  
  cargo.text = ""; // Limpiar el campo después de agregar
  editedIndex.value = 0; // Establecer el índice editado como 0 para que sea verde

    }

    isLoading.value = false;

   
  }, 500); // 2 segundos
};

const eliminarCargo = (index) => {
  formData.cargos.splice(index, 1);
};
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

.dialog-title {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1; /* Asegura que los botones estén por encima del contenido */
}

.dialog-actions {
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 1; /* Asegura que los botones estén por encima del contenido */
}

.dialog-button {
  margin-right: 16px; /* Espaciado entre los botones */
}


</style>
