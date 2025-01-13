<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="estados.formMiembros.display"
      transition="dialog-bottom-transition"
      fullscreen
      persistent
    >
      <v-card>
        <v-card-title
          class="dialog-title elevation-4"
          style="background: #eceff1"
        >
          <div style="display: flex">
            <h2>
              {{ estados.formMiembros.mode === "add" ? "Registro" : "Editar" }}
            </h2>
            <v-spacer></v-spacer>
            <v-btn
              @click="estados.formMiembros.display = false"
              append-icon="mdi-close"
              variant="text"
              class="text-none"
            >
              Cerrar
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-form ref="form1" @submit="saveMember">
            <!-- Información Personal -->
            <section
              class="sectionA d-flex flex-column align-center justify-center"
              style="width: 250px; margin: auto; margin-bottom: 26px"
            >
              <h2 class="mb-4">Fotografía</h2>

              <v-badge
                v-if="estados.selectImg.img !== null"
                overlap
                color="error"
              >
                <template #badge>
                  <v-icon
                    icon="mdi-close"
                    size="small"
                    @click="eliminarImg"
                    style="cursor: pointer"
                  ></v-icon>
                </template>
                <!-- Imagen que se amplía al hacer clic -->
                <v-avatar
                  :image="estados.selectImg.urlImg"
                  size="120"
                  style="cursor: pointer"
                  @click="ampliarImagen = true"
                ></v-avatar>
              </v-badge>
              <v-avatar
                v-if="estados.selectImg.img == null"
                :image="estados.selectImg.urlImg"
                size="120"
                style="cursor: pointer"
                @click="ampliarImagen = true"
              ></v-avatar>

              <div class="d-flex justify-space-between align-center">
                <div class="text-center mx-2">
                  <v-btn
                    size="x-small"
                    class="mt-2"
                    icon
                    @click="estados.selectImg.display = true"
                  >
                    <v-icon>mdi-folder-image</v-icon>
                    <!-- Ícono para "Seleccionar foto" -->
                  </v-btn>
                  <div style="font-size: 10px; margin-top: 2px; color: gray">
                    Seleccionar archivo
                  </div>
                </div>

                <div class="text-center mx-2">
                  <v-btn
                    size="x-small"
                    class="mt-2"
                    icon
                    @click="estados.tomarFoto = true"
                  >
                    <v-icon>mdi-camera</v-icon>
                    <!-- Ícono para "Tomar foto" -->
                  </v-btn>
                  <div style="font-size: 10px; margin-top: 2px; color: gray">
                    Tomar foto
                  </div>
                </div>
              </div>

              <!-- Modal para la imagen ampliada -->
              <v-dialog v-model="ampliarImagen" max-width="300px">
                <v-card>
                  <v-img
                    :src="estados.selectImg.urlImg"
                    aspect-ratio="1"
                  ></v-img>
                  <v-card-actions>
                    <v-btn text color="primary" @click="ampliarImagen = false">
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </section>

            <!-- Informacion personal -->
            <section class="sectionA">
              <h2>Información Personal</h2>
              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-select
                    v-model="formData.tipoDocumento"
                    :items="[
                      'Cedula de Ciudadania',
                      'Targeta de identidad',
                      'Registro Civil',
                      'Cedula Extrangera',
                    ]"
                    label="Tipo de documento"
                    :rules="createValidationRules(true, 30)"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    :disabled="estados.formMiembros.mode == 'edit'"
                    v-model="formData.numeroDocumento"
                    label="Número de documento"
                    type="number"
                    :rules="[
    ...createValidationRules(true, 30),
    value => /^\d*$/.test(value) || 'Solo se permiten números del 0 al 9. sin puntos ni comas'
  ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="formData.nombre"
                    label="Nombre"
                    :rules="createValidationRules(true, 30)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="formData.apellido"
                    label="Apellido"
                    :rules="createValidationRules(true, 30)"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-select
                    v-model="formData.rol"
                    :items="['Pastor', 'Miembro', 'Converso']"
                    label="Rol"
                    :rules="createValidationRules(true, 30)"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-select
                    v-model="formData.estado"
                    :items="['Activo', 'Inhabilitado']"
                    label="Estado"
                    :disabled="true"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="formData.fechaNacimiento"
                    label="Fecha de Nacimiento"
                    type="date"
                    :rules="createValidationRules(true, 30)"
                    outlined
                    dense
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="formData.lugarNacimineto"
                    label="Lugar de nacimiento"
                    :rules="createValidationRules(true, 30)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </section>
            <!-- Contacto -->
            <section class="sectionA">
              <h2>Contacto</h2>

              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="formData.celular"
                    label="Celular"
                    type="number"
                    :rules="createValidationRules(true, 12, false)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="formData.email"
                    label="Correo"
                    type="email"
                    :rules="[
    value => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Ingrese un correo electrónico válido.'
  ]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="formData.direccion"
                    label="Dirección"
                    :rules="createValidationRules(false, 50, false)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </section>
            <!-- Cuestionario -->
            <section class="sectionA">
              <h2>Cuestionario</h2>
              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <v-select
                    v-model="formData.nivelAcademico"
                    :items="nivelesAcademicos"
                    label="Nivel académico"
                    :rules="createValidationRules(true, 50, false)"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="formData.ocupacion"
                    label="Ocupación"
                    type="txt"
                    :rules="createValidationRules(true, 70, false)"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-select
                    v-model="formData.estadoCivil"
                    :items="[
                      'Casado/a',
                      'Soltero/a',
                      'Union libre',
                      'Viudo/a',
                      'Divorciado/a',
                    ]"
                    label="Estado Civil"
                    :rules="createValidationRules(true, 30, false)"
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="4" sm="6"
                  v-if="
                    formData.estadoCivil === 'Casado/a' ||
                    formData.estadoCivil === 'Union libre'
                  "
                >
                  <v-text-field
                    v-model="formData.nombreConyuge"
                    label="Nombre del conyuge"
                    type="txt"
                    :rules="
                      formData.estadoCivil === 'Casado/a' ||
                      formData.estadoCivil === 'Union libre'
                        ? createValidationRules(true, 50)
                        : []
                    "
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="hijo.text"
                    label="Nombre de hijos"
                    required
                  >
                    <template #append>
                      <v-btn
                        :loading="isLoading"
                        class="flex-grow-1"
                        height="48"
                        :color="hijo.text !== '' ? 'success' : ''"
                        @click="agregarHijo"
                      >
                        <v-icon icon="mdi-check"></v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                  <v-chip-group filter>
                    <v-chip
                      v-for="(hijo, index) in formData.listaHijos"
                      :key="index"
                      :color="index === editedIndex ? editedColor : ''"
                    >
                      {{ hijo.text }}
                      <v-icon @click="eliminarHijo(index)">mdi-close</v-icon>
                    </v-chip>
                  </v-chip-group>
                </v-col>

                <v-col
                  cols="12"
                  md="4" sm="6"
                  v-if="formData.estadoCivil === 'Casado/a'"
                >
                  <v-select
                    v-model="formData.enteMatrimonial"
                    :items="['Por Notaria', 'Por la IPUC']"
                    label="Ente matrimonial"
                    :rules="
                      formData.estadoCivil === 'Casado/a'
                        ? createValidationRules(true, 50)
                        : []
                    "
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="4" sm="6"
                  v-if="formData.estadoCivil === 'Divorciado/a'"
                >
                  <v-radio-group
                    v-model="formData.tribunalEclesiastico"
                    inline
                    :rules="
                      formData.estadoCivil === 'Divorciado/a'
                        ? createValidationRules(true, 50)
                        : []
                    "
                  >
                    <p>¿Pasó por Tribunal Eclesiástico de la Ipuc?</p>
                    <div style="display: flex">
                      <v-radio label="Sí" value="Sí"></v-radio>
                      <v-radio label="No" value="No"></v-radio>
                    </div>
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="12"
                  md="4" sm="6"
                  v-if="formData.tribunalEclesiastico === 'Sí'"
                >
                  <v-radio-group
                    v-model="formData.conceptoTribunal"
                    inline
                    :rules="
                      formData.tribunalEclesiastico === 'Sí'
                        ? createValidationRules(true, 50)
                        : []
                    "
                  >
                    <p>¿Cual es el concepto del tribunal Eclesiástico</p>
                    <div style="display: flex">
                      <v-radio label="Favorable" value="Favorable"></v-radio>
                      <v-radio
                        label="Desfavorable"
                        value="Desfavorable"
                      ></v-radio>
                    </div>
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="12"
                  md="4" sm="6"
                  v-if="formData.tribunalEclesiastico === 'Sí'"
                >
                <v-text-field
                v-if="estados.formMiembros.modo === 'edit'"
                    label="Soporte actual"
                    accept=".pdf"
                    v-model="soporteTribunaln"
                    outlined
                    dense
                    disabled
                  ></v-text-field>
                  <v-file-input
                  :label="formData.soporteTribunal ? 'Cambiar soporte' : 'Adjuntar soporte Eclesiástico'"
                    accept=".pdf"
                    v-model="soporteTribunal"
                    outlined
                    dense
                  ></v-file-input>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-radio-group
                    v-model="formData.discapacitado"
                    inline
                    :rules="createValidationRules(true, 30, false)"
                  >
                    <p>¿Tiene usted alguna discapacidad?</p>
                    <div style="display: flex">
                      <v-radio label="Sí" value="Sí"></v-radio>
                      <v-radio label="No" value="No"></v-radio>
                    </div>
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="12" md="4" sm="6"
                  v-if="formData.discapacitado === 'Sí'"
                >
                  <v-select
                    v-model="formData.discapacidad"
                    :items="tiposDiscapacidad"
                    label="Tipo de discapacidad"
                    :rules="
                      formData.discapacitado === 'Sí'
                        ? createValidationRules(true, 50)
                        : []
                    "
                  ></v-select>
                </v-col>
                <v-col
                  cols="12" md="4" sm="6"
                  v-if="formData.discapacidad === 'Otra'"
                >
                  <v-text-field
                    v-model="formData.descripcionDiscapacidad"
                    label="Descripcion de Discapacidad"
                    :rules="
                      formData.discapacidad === 'Otra'
                        ? createValidationRules(true, 130)
                        : []
                    "
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-radio-group
                    v-model="formData.sexo"
                    inline
                    :rules="createValidationRules(true, 30, false)"
                  >
                    <p class="mb-2">¿Cual es el sexo?</p>
                    <div style="display: flex">
                      <v-radio label="Hombre" value="Hombre"></v-radio>
                      <v-radio label="Mujer" value="Mujer"></v-radio>
                    </div>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-radio-group
                    v-model="formData.esBautizado"
                    inline
                    :rules="createValidationRules(true, 30, false)"
                  >
                    <p>¿Es usted bautizado/a?</p>
                    <div style="display: flex">
                      <v-radio label="Sí" value="Sí"></v-radio>
                      <v-radio label="No" value="No"></v-radio>
                    </div>
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="12" md="4" sm="6"
                  v-if="formData.esBautizado === 'Sí'"
                >
                  <v-text-field
                    v-model="formData.nombrePastorBautismo"
                    label="Nombre del pastor que lo bautizó"
                    :rules="
                      formData.esBautizado === 'Sí'
                        ? createValidationRules(true, 50)
                        : []
                    "
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12" md="4" sm="6"
                  v-if="formData.esBautizado === 'Sí'"
                >
                  <v-text-field
                    v-model="formData.fechaBautismo"
                    label="Fecha de Bautizmo"
                    type="date"
                    :rules="
                      formData.esBautizado === 'Sí'
                        ? createValidationRules(true, 30)
                        : []
                    "
                    outlined
                    dense
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12" md="4" sm="6"
                  v-if="formData.esBautizado === 'Sí'"
                >
                  <v-text-field
                    v-model="formData.lugarBautismo"
                    label="Lugar de  bautismo"
                    :rules="
                      formData.esBautizado === 'Sí'
                        ? createValidationRules(true, 50)
                        : []
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-radio-group
                    v-model="formData.espiritu"
                    inline
                    :rules="createValidationRules(true, 30, false)"
                  >
                    <p>¿Es usted sellado/a con el Espiritu Santo?</p>
                    <div style="display: flex">
                      <v-radio label="Sí" value="Sí"></v-radio>
                      <v-radio label="No" value="No"></v-radio>
                    </div>
                  </v-radio-group>
                </v-col>
                <v-col
                  cols="12" md="4" sm="6"
                  v-if="formData.espiritu === 'Sí'"
                >
                  <v-text-field
                    v-model="formData.fechaEspiritu"
                    label="Fecha de Recepción Espíritu Santo"
                    type="date"
                    :rules="
                      formData.espiritu === 'Sí'
                        ? createValidationRules(true, 30)
                        : []
                    "
                    outlined
                    dense
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
            </section>

            <!-- Cargos -->
            <section class="sectionA">
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

              <v-textarea
                v-model="formData.referenciaPastoral"
                label="Referencia Pastoral"
                counter="500"
              ></v-textarea>
            </section>
          </v-form>
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer />
          <v-btn
            @click="estados.formMiembros.display = false"
            style="text-transform: none"
          >
            {{
              estados.formMiembros.mode === "view" ? "Cerrar" : "Cancelar"
            }}</v-btn
          >
          <v-btn
            color="primary"
            @click="saveMember"
            v-if="estados.formMiembros.mode === 'add'"
            :disabled="btnSave"
            style="text-transform: none"
          >
            Guardar
          </v-btn>
          <v-btn
            color="primary"
            @click="saveMember"
            v-if="estados.formMiembros.mode === 'edit'"
            :disabled=" JSON.stringify(registroSelected) === JSON.stringify(formData)"
            style="text-transform: none"
          >
            Guardar cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, watch, onMounted, computed  } from "vue";
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
import { uploadFile } from "../scripts/subirFiles.js";
import defaultImg from "@/assets/defaultImg.png";
import { auth, db } from "../ConfigFirebase";
import swal from "sweetalert";
const estados = useAppStore();
const btnSave = ref(false);
const editMode = ref(false);
const ampliarImagen = ref(false); // Controla la visibilidad del modal
const form1 = ref(null);
const soporteTribunal = ref(null);

// Propiedad computada para obtener el nombre del archivo
const soporteTribunaln = computed(() => {
  if (formData.soporteTribunal) {
    // Extraer solo el nombre del archivo de la URL
    const parts = formData.soporteTribunal.split("/");
    return parts[parts.length - 1].split("?")[0]; // Eliminar parámetros como `?alt=media`
  }
  return "No se ha cargado ningún archivo"; // Mensaje por defecto
});
var registroSelected = reactive({});
const dataDefault = reactive({
  
});

const formData = reactive({
  //Datos por defecto
  historiaCargos: [],
  sede: "",
  datosRegistro: {
    timestamp: null,
    sede: {},
  },
  historiaTraslados: [],

//formulario

  foto: "", // Ruta o URL del avatar
  estado: "Activo",
  tipoDocumento: "",
  numeroDocumento: "",
  nombre: "",
  apellido: "",
  rol: "",
  fechaNacimiento: "",
  lugarNacimineto: "", //nuevo campo
  celular: "",
  email: "", //nuevo campo
  direccion: "",
  nivelAcademico: "",
  ocupacion: "", //Nuevo campo
  discapacitado: "",
  discapacidad: "",
  descripcionDiscapacidad: "",
  sexo: "",
  estadoCivil: "",
  enteMatrimonial: "", ///N
  tribunalEclesiastico: "", //N
  conceptoTribunal: "", //N
  soporteTribunal: null, //N
  nombreConyuge: "",
  listaHijos: [], //N
  esBautizado: false,
  fechaBautismo: "",
  lugarBautismo: "", //N
  nombrePastorBautismo: "",
  espiritu: "",
  fechaEspiritu: "", //N
  cargos: [],
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


//Escuchar variable de estado del formulario
 watch(
  () => estados.formMiembros,
  (newData) => {
      eliminarImg();
      clearFormFields();
      formData.estado = "Activo";
   
     
    if (newData.mode === "edit") {
     
      const registro = estados.miembros.find(
        (item) => item.numeroDocumento === newData.id
      );
     
      // Asignar los valores de objetoA a objetoB solo para las propiedades comunes
      Object.keys(registro).forEach((key) => {
        if (formData.hasOwnProperty(key)) {
          formData[key] = registro[key]; // Asigna el valor solo si la propiedad existe en objetoB
        }
      });

      if(formData.foto===""){ estados.selectImg.urlImg=defaultImg}else{
      estados.selectImg.urlImg=formData.foto;}
     
    }
  }
);

// Ejecutar cuando el componente se monta
onMounted(() => {
  if (estados.data) {
  }
});

const saveMember = async () => {
  // Realiza la validación
  const isValid = await form1.value.validate();
  if (!isValid.valid) {
    swal(
      "Validación requerida",
      "Hay uno o más campos vacíos. Por favor, revisa el formulario.",
      "error"
    );

    return; // Si no es válido, no continua
  }

  // Habilitar el botón de guardar y mostrar el progreso
  btnSave.value = true;
  estados.progre = true;
  // Actualiza el timestamp antes de guardar

 
 

  // Verifica si se seleccionó una imagen para subir
  if (estados.selectImg.img != null) {
    const fileUP = estados.selectImg.img;
    const customName = formData.numeroDocumento + ".jpg"; // Nombre para el archivo
    const path = "FotosMiembros/" + customName; // Carpeta en Firebase Storage
    const newImg = new File([fileUP], customName, { type: fileUP.type });

    // Espera a que la imagen se suba antes de continuar
    const [uploadSuccess, downloadURLOrError] = await uploadFile(path, newImg);

    if (!uploadSuccess) {
      //console.error("Error al subir la imagen:", downloadURLOrError);
      swal(
        "Error",
        "Hubo un problema al subir la imagen. Inténtalo de nuevo.",
        "error"
      );
      return; // Detiene la función si la subida de la imagen falla
    }

    // Si la subida fue exitosa, se guarda la URL de la imagen
    formData.foto = downloadURLOrError;
  }

  if (soporteTribunal.value != null) {
    const file = soporteTribunal.value[0];
    // Validar que el archivo sea Word (.docx) o PDF (.pdf)
    const allowedExtensions = [".pdf"];
    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      swal(
        "Tipo de archivo no permitido",
        "Solo se permiten archivos Word (.docx) o PDF (.pdf).",
        "error"
      );
      return; // Si el archivo no es válido, no continúa
    }

    const customName = formData.numeroDocumento + fileExtension; // Nombre para el archivo con la extensión correcta
    const path = "SoportesTribunal/" + customName; // Carpeta en Firebase Storage
    const newImg = new File([file], customName, { type: file.type });

    // Espera a que el archivo se suba antes de continuar
    const [uploadSuccess, downloadURLOrError] = await uploadFile(path, newImg);

    if (!uploadSuccess) {
      console.error("Error al subir el archivo:", downloadURLOrError);
      swal(
        "Error",
        "Hubo un problema al subir el archivo. Inténtalo de nuevo.",
        "error"
      );
      return; // Detiene la función si la subida del archivo falla
    }

    // Si la subida fue exitosa, se guarda la URL del archivo
   formData.soporteTribunal = downloadURLOrError;
  }
  



  if(estados.formMiembros.mode==="add"){
   formData.datosRegistro.timestamp = serverTimestamp();
    formData.sede = auth.currentUser.email;
      formData.datosRegistro.sede = estados.data;
    //console.log(formData);
    const resultado = await buscarV(miembro.numeroDocumento);
  if (resultado) return; // Si ya existe, no continua
  guardarRegistro(miembro);
  }else{
  
  // console.log(formData);
    editar() ;
  }
 
 
};

//Permite guardar el registro por primera vez en firebase
async function guardarRegistro(d) {
  try {
    const docRef = await setDoc(doc(db, "Membresia", d.numeroDocumento), d);
    clearFormFields();
    estados.progre = false;
    btnSave.value = false;
    estados.formMiembros = { display: false, mode: "", id: "" };
    // Muestra un mensaje de confirmación si se guardó correctamente
    swal("Éxito!", "El registro se ha guardado correctamente.", "success");
  } catch (error) {
    // Muestra un mensaje de error si hubo un problema al guardar
    estados.progre = false;
    btnSave.value = false;
    swal(
      "Error!",
      "Hubo un problema al guardar el registro en Firebase." + error,
      "error"
    );
  }
}

async function editar() {
  try {
    const miembro = doc(db, "Membresia", estados.formMiembros.id);

    //console.log(  {...formData})
    await updateDoc(miembro, formData);
    estados.progre = false;
    btnSave.value = false;
    clearFormFields();
    estados.formMiembros = { display: false, mode: "", id: "" };
    // Muestra un mensaje de confirmación si se actualizó correctamente
    swal("Éxito!", "El registro se ha actualizado correctamente.", "success");
  } catch (error) {
    // Muestra un mensaje de error si hubo un problema al actualizar
    estados.progre = false;
    btnSave.value = false;
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
    } else if (typeof formData[key] === "string") {
      // Mantener el valor actual si la clave es "estado"
      if (key !== "estado") {
        formData[key] = "";
      }
    } else if (typeof formData[key] === "number") {
      formData[key] = null;
    }
  }
}

//Ecucha cambios en el formulario
watch(
  () => formData,
  (newData) => {
    // Limpiar valores relacionados con la discapacidad
    if (newData.discapacitado === "No") {
      formData.discapacidad = null;
      formData.descripcionDiscapacidad = null;
    }

    if (newData.discapacidad !== "Otra") {
      formData.descripcionDiscapacidad = null;
    }

    // Limpiar valores relacionados con el bautismo
    if (newData.esBautizado === "No") {
      formData.fechaBautismo = null;
      formData.nombrePastorBautismo = null;
      formData.lugarBautismo = null;
    }

    // Limpiar valores relacionados con el Tribunal Eclesiástico
    if (newData.tribunalEclesiastico !== "Sí") {
      formData.conceptoTribunal = null;
      formData.soporteTribunal = null;
    }

    // Limpiar valores relacionados con el estado civil
    if (
      newData.estadoCivil !== "Casado/a" &&
      newData.estadoCivil !== "Union libre"
    ) {
      formData.nombreConyuge = null;
      formData.enteMatrimonial = null;
    }

    if (newData.estadoCivil !== "Divorciado/a") {
      formData.tribunalEclesiastico = null;
      formData.conceptoTribunal = null;
    }

    // Limpiar valores relacionados con el Espíritu Santo
    if (newData.espiritu !== "Sí") {
      formData.fechaEspiritu = null;
    }
  },
  { deep: true } // Necesario para observar cambios dentro de un objeto anidado
);

//HAce una busqueda para verificar que no esiste un registro con ese documento
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
    estados.progre = false;
    btnSave.value = false;
    swal(
      "Error!",
      "Ya existe un registro con este número de documento!",
      "error"
    );

    return true; // Se encontró al menos un documento
  }
}

var cargo = reactive({
  text: "",
  isDelet: true,
  color: "green",
  fecha: new Date(),
});
var hijo = reactive({
  text: "",
  isDelet: true,
  color: "green",
});
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
const agregarHijo = () => {
  isLoading.value = true; // Activar la carga al hacer clic en el icono

  setTimeout(() => {
    if (hijo.text.trim() !== "") {
      const nuevoHijo = { ...hijo }; // Crear una copia independiente de cargo

      formData.listaHijos.unshift(nuevoHijo); // Agregar al principio del array

      hijo.text = ""; // Limpiar el campo después de agregar
      editedIndex.value = 0; // Establecer el índice editado como 0 para que sea verde
    }

    isLoading.value = false;
  }, 500); // 2 segundos
};
const eliminarCargo = (index) => {
  formData.cargos.splice(index, 1);
};
const eliminarHijo = (index) => {
  formData.listaHijos.splice(index, 1);
};

//////////ZONA DE PRUEBAS///////
function eliminarImg(params) {
  estados.selectImg.img = null;
  estados.selectImg.urlImg = defaultImg;
}

//REGLAS DE VALIDACION
function createValidationRules(required, maxLength, esEmail) {
  const rules = [];

  if (required) {
    rules.push((value) => !!value || "Este campo no puede estar vacío.");
  }

  if (maxLength !== null) {
    rules.push(
      (value) =>
        value.length <= maxLength ||
        `Este campo no puede tener más de ${maxLength} caracteres.`
    );
  }

  if (esEmail) {
    rules.push(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        "Ingrese un correo electrónico válido."
    );
  }

  return rules;
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

.sectionA {
  border: 1px solid rgb(175, 173, 173);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 30px;
  -webkit-box-shadow: 3px 8px 5px -7px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 8px 5px -7px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 8px 5px -7px rgba(0, 0, 0, 0.75);
}
</style>
