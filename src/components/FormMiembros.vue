<template>
  <!-- Diálogo de Registro/Edit -->
  <v-dialog v-model="estados.formMiembros.display" max-width="600">
    <v-card>
      <v-card-title>
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
          <!-- Campos del formulario -->
          <!-- Tipo documento -->
          <v-select
            v-model="formData.tipoDocumento"
            :items="[
              'Cedula de Ciudadania',
              'Targeta de identidad',
              'Registro Civil',
              'Cedula Extrangera',
            ]"
            label="Tipo de documento"
          ></v-select>

          <!-- Número de documento -->
          <v-text-field
            v-model="formData.numeroDocumento"
            label="Número de documento"
            type="number"
            required
          ></v-text-field>

          <!-- Nombre y Apellido -->
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="formData.nombre"
                label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="formData.apellido"
                label="Apellido"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Rol -->
          <v-select
            v-model="formData.rol"
            :items="['Pastor', 'Miembro']"
            label="Rol"
          ></v-select>

          <!-- Fecha de nacimiento -->
          <div class="date-input">
            <label for="fechaNacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              v-model="formData.fechaNacimiento"
              id="fechaNacimiento"
            />
          </div>
          <!-- Celular -->
          <v-text-field
            v-model="formData.celular"
            label="Celular"
            type="number"
          ></v-text-field>

          <!-- Dirección -->
          <v-text-field
            v-model="formData.direccion"
            label="Dirección"
          ></v-text-field>

          <!-- Sexo -->
          <v-radio-group v-model="formData.sexo" label="Sexo">
            <v-radio label="Hombre" value="Hombre"></v-radio>
            <v-radio label="Mujer" value="Mujer"></v-radio>
          </v-radio-group>

          <!-- Estado Civil -->
          <v-select
            v-model="formData.estadoCivil"
            :items="['Casado/a', 'Soltero/a']"
            label="Estado Civil"
          ></v-select>

          <!-- ¿Es usted bautizado? -->
          <v-radio-group
            v-model="formData.esBautizado"
            label="¿Es usted bautizado/a?"
          >
            <v-radio label="Sí" value="Sí"></v-radio>
            <v-radio label="No" value="No"></v-radio>
          </v-radio-group>

          <!-- Si es bautizado (mostrar) -->

          <div class="date-input" v-if="formData.esBautizado === 'Sí'">
            <label for="fechaNacimiento">Fecha de bautismo:</label>
            <input
              type="date"
              v-model="formData.fechaBautismo"
              id="fechaNacimiento"
            />
          </div>
          <v-text-field
            v-if="formData.esBautizado === 'Sí'"
            v-model="formData.nombrePastorBautismo"
            label="Nombre del pastor que lo bautizó"
          ></v-text-field>
          <v-textarea
            v-model="formData.referenciaPastoral"
            label="Referencia Pastoral"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="estados.formMiembros.display = false">
          {{
            estados.formMiembros.mode === "view" ? "Cerrar" : "Cancelar"
          }}</v-btn
        >
        <v-btn
          color="primary"
          @click="saveMember"
          v-if="estados.formMiembros.mode !== 'view'"
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
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";

const estados = useAppStore();

const dialog = ref(false);
const editMode = ref(false);

const dataDefault = reactive({
  idSedeCongregacion: null,
  distrito: null,
  zona: null,
  municipio: null,
  solicitudTraslado: null,
  datosRegistro: {
    fecha: new Date().toISOString().split("T")[0],
    Hora: new Date().toTimeString().split(" ")[0],
    sede: null,
    pastor: null,
  },
  historiaTraslados: [],
});
const formData = reactive({
  tipoDocumento: "",
  numeroDocumento: "",
  nombre: "",
  apellido: "",
  rol: "",
  fechaNacimiento: null,
  celular: "",
  direccion: "",
  sexo: "",
  estadoCivil: "",
  esBautizado: "",
  fechaBautismo: null,
  nombrePastorBautismo: "",
  referenciaPastoral: "",
});

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
    }
  }
);
const actualizarFormData = (newData) => {
  if (newData) {
    dataDefault.idSedeCongregacion = newData.id;
    dataDefault.distrito = newData.distrito;
    dataDefault.zona = newData.zona;
    dataDefault.municipio = newData.municipio;
    dataDefault.datosRegistro.sede = newData.id;
    dataDefault.datosRegistro.pastor = newData.ministro;
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
  console.log(JSON.parse(JSON.stringify(miembro)));
  if (!validateForm(miembro)) return;
  if (estados.formMiembros.mode === "add") {
    guardarRegistro(miembro);
  } else {
    editar();
  }
};

//Permite guardar el registro por primera vez en firebase
async function guardarRegistro(d) {
  const docRef = await addDoc(collection(db, "Membresia"), d);
  clearFormFields();
  estados.formMiembros = { display: false, mode: "", id: "" };
  console.log("Document written with ID: ", docRef.id);
}

async function editar() {
  const miembro = doc(db, "Membresia", estados.formMiembros.id);
  await updateDoc(miembro, formData);
  clearFormFields();
  estados.formMiembros = { display: false, mode: "", id: "" };
}

//FUNCIONES

function clearFormFields() {
  formData.tipoDocumento = "";
  formData.numeroDocumento = "";
  formData.nombre = "";
  formData.apellido = "";
  formData.rol = "";
  formData.fechaNacimiento = null;
  formData.celular = "";
  formData.direccion = "";
  formData.sexo = "";
  formData.estadoCivil = "";
  formData.esBautizado = "";
  formData.fechaBautismo = null;
  formData.nombrePastorBautismo = "";
  formData.referenciaPastoral = "";
}

function validateForm(d) {
  if (d.idSedeCongregacion == "" || d.idSedeCongregacion == null) {
    alert("Error desconocido");
    return false;
  }
  if (d.distrito == "" || d.distrito == null) {
    alert("Error desconocido");
    return false;
  }
  if (d.zona == "" || d.zona == null) {
    alert("Error desconocido");
    return false;
  }
  if (d.municipio == "" || d.municipio == null) {
    alert("Error desconocido");
    return false;
  }
  if (d.distrito == "" || d.distrito == null) {
    alert("Error desconocido");
    return false;
  }
  if (
    d.datosRegistro.pastor == "" ||
    d.datosRegistro.pastor == null ||
    d.datosRegistro.sede == "" ||
    d.datosRegistro.sede == null
  ) {
    alert("Error desconocido");
    return false;
  }
  if (
    d.datosRegistro.pastor == "" ||
    d.datosRegistro.pastor == null ||
    d.datosRegistro.sede == "" ||
    d.datosRegistro.sede == null
  ) {
    alert("Error desconocido");
    return false;
  }

  if (d.tipoDocumento == "" || d.tipoDocumento.length > 30) {
    alert("El campo Tipo de documento no puede quedar vacio");
    return false;
  }
  if (d.numeroDocumento == "" || d.numeroDocumento.length > 30) {
    alert(
      "El campo numero de documento no puede quedar vacio ni tener mas de 30 caracteres"
    );
    return false;
  }

  if (d.nombre == "" || d.nombre.length > 40) {
    alert(
      "El campo nombre no puede quedar vacio ni tener mas de 40 caracteres"
    );
    return false;
  }

  if (d.apellido == "" || d.apellido.length > 40) {
    alert(
      "El campo apellido no puede quedar vacio ni tener mas de 40 caracteres"
    );
    return false;
  }

  if (d.rol == "" || d.rol.length > 40) {
    alert("El campo rol no puede quedar vacio");
    return false;
  }
  if (d.fechaNacimiento == "" || d.fechaNacimiento == null) {
    alert("El campo fecha de nacimiento no puede quedar vacio");
    return false;
  }
  if (d.celular == "" || d.celular == null || d.celular.length > 16) {
    alert(
      "El campo celular  no puede quedar vacio,ni tener mas de 16 caracteres"
    );
    return false;
  }

  if (d.direccionr == "" || d.direccion == null || d.direccion.length > 60) {
    alert(
      "El campo direccion no puede quedar vacio,ni tener mas de 60 caracteres"
    );
    return false;
  }
  if (d.direccion == "" || d.direccion == null || d.direccion.length > 60) {
    alert(
      "El campo direccion no puede quedar vacio,ni tener mas de 60 caracteres"
    );
    return false;
  }
  if (d.sexo == "" || d.sexo == null) {
    alert("El campo sexo no puede quedar vacio");
    return false;
  }

  if (d.estadoCivil == "" || d.estadoCivil == null) {
    alert("El campo estado civil no puede quedar vacio");
    return false;
  }
  if (d.esBautizado == "" || d.esBautizado == null) {
    alert("El campo ¿Es usted bautizado? no puede quedar vacio");
    return false;
  }

  if (d.esBautizado == "Sí") {
    if (d.fechaBautismo == "" || d.fechaBautismo == null) {
      alert("El campo fecha bautizmo no puede quedar vacio");
      return false;
    }
    if (
      d.nombrePastorBautismo == "" ||
      d.nombrePastorBautismo == null ||
      d.nombrePastorBautismo.length > 50
    ) {
      alert(
        "El campo nombre del pastor que le bautizo no puede quedar vacio ni tener mas de 50 caracteres"
      );
      return false;
    }
  } else {
    formData.fechaBautismo = "";
    formData.nombrePastorBautismo = "";
  }

  return true;
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
