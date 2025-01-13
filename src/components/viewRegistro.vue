<template>
  <v-dialog
    v-model="estados.viewRegistro.display"
    transition="fade-transition"
    persistent
    max-width="1080px"
    dialog-title
  >
    <v-card>
      <v-card-title class="dialog-title elevation-4">
        <div style="display: flex" class="">
          <h2>Resumen</h2>
          <v-spacer></v-spacer>
          <v-btn
            @click="estados.viewRegistro.display = false"
            append-icon="mdi-close"
            variant="outlined"
          >
            Cerrar
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <!-- Fotografía -->
        <section
          class="sectionA d-flex flex-column align-center justify-center"
        >
          <h2>Fotografía</h2>
          <v-avatar
            :image="formData.foto || defaultImg"
            size="120"
            @click="ampliarImagen = true"
            style="cursor: pointer"
          ></v-avatar>
          <p class="text-muted">Haga clic para ampliar</p>
        </section>

        <!-- Diálogo para ampliar la imagen -->
        <v-dialog
          v-model="ampliarImagen"
          max-width="100%"
          max-height="100%"
          class="pa-0"
          fullscreen
        >
          <v-card class="pa-2" color="black">
            <v-card-actions>
              <v-spacer />
              <v-btn
                @click="ampliarImagen = false"
                append-icon="mdi-close"
                variant="outlined"
              >
                Cerrar
                <template v-slot:append>
                  <v-icon color="error"></v-icon>
                </template>
              </v-btn>
            </v-card-actions>
            <v-img
              :src="formData.foto || defaultImg"
              max-height="400"
              contain
              class="rounded-sm"
            ></v-img>
          </v-card>
        </v-dialog>
        <!-- Información Personal -->
        <section class="sectionA">
          <h2 class="mb-8">Información Personal</h2>
          <v-row>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Estado Actual:</strong>
              <span class="vistaDatos">{{ formData.estado }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Tipo de Documento:</strong>
              <span class="vistaDatos">{{ formData.tipoDocumento }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Número de Documento:</strong>
              <span class="vistaDatos">{{ formData.numeroDocumento }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Nombre(s):</strong>
              <span class="vistaDatos">{{
                capitalizeWords(formData.nombre)
              }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Apellido(s):</strong>
              <span class="vistaDatos">{{
                capitalizeWords(formData.apellido)
              }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Rol o Cargo:</strong>
              <span class="vistaDatos">{{ formData.rol }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Fecha de Nacimiento:</strong>
              <span class="vistaDatos">{{
                formatFecha(formData.fechaNacimiento)
              }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Lugar de Nacimiento:</strong>
              <span class="vistaDatos">{{ formData.lugarNacimineto }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Sexo:</strong>
              <span class="vistaDatos">{{ formData.sexo }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Estado Civil:</strong>
              <span class="vistaDatos">{{ formData.estadoCivil }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Número de Teléfono Celular:</strong>
              <span class="vistaDatos">{{ formData.celular }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Correo Electrónico:</strong>
              <span class="vistaDatos">{{ formData.email }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong class="subTitles">Dirección de Residencia:</strong>
              <span class="vistaDatos">{{ formData.direccion }}</span>
            </v-col>
          </v-row>
        </section>

        <!-- Información académica y laboral -->
        <section class="sectionA">
          <h2 class="mb-8">Información académica y laboral</h2>
          <v-row>
            <v-col cols="12" md="6" class="field">
              <strong>Nivel Académico:</strong>
              <span class="vistaDatos">{{ formData.nivelAcademico }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Ocupación:</strong>
              <span class="vistaDatos">{{ formData.ocupacion }}</span>
            </v-col>
          </v-row>
        </section>
        <!-- Condición Física o Cognitiva -->
        <section class="sectionA">
          <h2 class="mb-8">Condición Física o Cognitiva</h2>
          <v-row>
            <v-col cols="12" md="6" class="field">
              <strong>¿Es discapacitado/a?:</strong>
              <span class="vistaDatos">{{ formData.discapacitado }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Tipo de Discapacidad:</strong>
              <span class="vistaDatos">{{ formData.discapacidad }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Descripción de Discapacidad:</strong>
              <span class="vistaDatos">{{
                formData.descripcionDiscapacidad
              }}</span>
            </v-col>
          </v-row>
        </section>
        <!-- 4. Información matrimonial y familiar-->
        <section class="sectionA">
          <h2 class="mb-8">4. Información matrimonial y familiar</h2>
          <v-row>
            <v-col cols="12" md="6" class="field">
              <strong>Ente Matrimonial:</strong>
              <span class="vistaDatos">{{ formData.enteMatrimonial }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>¿Paso usted por el tribunal eclesiastico?:</strong>
              <span class="vistaDatos">{{
                formData.tribunalEclesiastico
              }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Cual fue el concepto del tribunal Eclesiastico:</strong>
              <span class="vistaDatos">{{ formData.conceptoTribunal }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Soporte del del concepto del tribunal:</strong>
              <span
                class="vistaDatos"
                v-if="formData.soporteTribunal !== 'Campo vacío'"
              >
                <v-btn size="x-small"
                  v-if="formData.soporteTribunal !== 'Campo vacío'"
                  @click="descargarArchivo(formData.soporteTribunal)"
                >
                  Descargar Soporte
                </v-btn>
              </span>
              <span
                class="vistaDatos"
                v-if="formData.soporteTribunal === 'Campo vacío'"
              >
                Sin soporte
              </span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Nombre del conyuge:</strong>
              <span class="vistaDatos">{{ formData.nombreConyuge }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Numero de hijos:</strong>
              <span class="vistaDatos">
              {{ formData.listaHijos.length > 0 ? formData.listaHijos.length : 0 }}
            </span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Nombre de hijos:</strong>
              <span class="vistaDatos" v-if="formData.listaHijos.length ===0">No hay registro de hijos</span>
              <v-row class="d-flex flex-wrap mt-2 mb-2" v-if="formData.listaHijos.length > 0">
                <v-chip
                  v-for="(list, index) in formData.listaHijos"
                  :key="index"
                  class="ma-1"
                  color="blue-grey-darken-4"
                  text-color="blue darken-4"
                  style="border-radius: 12px"
                >
                  {{ list.text }}
                </v-chip>
              </v-row>
            </v-col>
          </v-row>
        </section>
        <!-- 5. Información religiosa-->
        <section class="sectionA">
          <h2 class="mb-8">5. Información religiosa</h2>
          <v-row>
            <v-col cols="12" md="6" class="field">
              <strong>¿Es bautizado?:</strong>
              <span class="vistaDatos">{{ formData.esBautizado }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Fecha del bautismo:</strong>
              <span class="vistaDatos">{{ formData.fechaBautismo === 'Campo vacío' ? 'Campo vacío' : formatFecha(formData.fechaBautismo) }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Lugar donde fue bautizado:</strong>
              <span class="vistaDatos">{{ formData.lugarBautismo }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Nombre del pastor que le bautizo:</strong>
              <span class="vistaDatos">{{
                formData.nombrePastorBautismo
              }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Es sellado con el Espiritu Santo?:</strong>
              <span class="vistaDatos">{{ formData.espiritu }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Fecha de recepción del Espiritu Santo:</strong>
              <span class="vistaDatos"> {{ formData.fechaEspiritu === 'Campo vacío' ? 'Campo vacío' : formatFecha(formData.fechaEspiritu) }}</span>
            </v-col>
            <v-col cols="12" md="6" class="field">
              <strong>Cargos:</strong>
              
              <span class="vistaDatos" v-if="formData.cargos.length ===0">Sin Cargos</span>
              <v-row class="d-flex flex-wrap mt-2 mb-2" v-if="formData.cargos.length >0">
                <v-chip
                  v-for="(cargo, index) in formData.cargos"
                  :key="index"
                  class="ma-1"
                  color="blue-grey-darken-4"
                  text-color="blue darken-4"
                  style="border-radius: 12px"
                >
                  {{ cargo.text }}
                </v-chip>
              </v-row>
            </v-col>
          </v-row>
        </section>
        <!-- 5. Referencia Pastoral-->
        <section class="sectionA">
          <h2 class="mb-8">6. Referencia Pastoral</h2>
          <v-row>
            <v-col cols="12" md="12" class="field">
              <textarea
                v-model="formData.referenciaPastoral"
                readonly
                class="no-editable-textarea"
              ></textarea>
            </v-col>
          </v-row>
        </section>
      </v-card-text>
      <v-card-actions class="dialog-actions">
        <v-spacer />
        <v-btn @click="estados.viewRegistro.display = false" variant="text">
          Cerrar
        </v-btn>
        <v-btn color="primary" @click="estados.formMiembros = { display: true, mode: 'edit', id:formData.numeroDocumento }"> Editar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import defaultImg from "@/assets/defaultImg.png";
import { useAppStore } from "../store/app";
import { capitalizeWords, formatFecha } from "@/scripts/misFunciones";
const estados = useAppStore();
const ampliarImagen = ref(false);

var formData = reactive({
  foto: "", // Ruta o URL del avatar
  estado: "",
  tipoDocumento: "",
  numeroDocumento: "",
  nombre: "",
  apellido: "",
  rol: "",
  fechaNacimiento: "",
  lugarNacimineto: "",
  celular: "",
  email: "",
  direccion: "",
  nivelAcademico: "",
  ocupacion: "",
  discapacitado: "",
  discapacidad: "",
  descripcionDiscapacidad: "",
  sexo: "",
  estadoCivil: "",
  enteMatrimonial: "",
  tribunalEclesiastico: "",
  conceptoTribunal: "",
  soporteTribunal: null,
  nombreConyuge: "",
  listaHijos: [],
  esBautizado: false,
  fechaBautismo: "",
  lugarBautismo: "",
  nombrePastorBautismo: "",
  espiritu: "",
  fechaEspiritu: "",
  cargos: [],
  referenciaPastoral: "",
});
var defaultformData = reactive({
  foto: "", // Ruta o URL del avatar
  estado: "",
  tipoDocumento: "",
  numeroDocumento: "",
  nombre: "",
  apellido: "",
  rol: "",
  fechaNacimiento: "",
  lugarNacimineto: "",
  celular: "",
  email: "",
  direccion: "",
  nivelAcademico: "",
  ocupacion: "",
  discapacitado: "",
  discapacidad: "",
  descripcionDiscapacidad: "",
  sexo: "",
  estadoCivil: "",
  enteMatrimonial: "",
  tribunalEclesiastico: "",
  conceptoTribunal: "",
  soporteTribunal: null,
  nombreConyuge: "",
  listaHijos: [],
  esBautizado: false,
  fechaBautismo: "",
  lugarBautismo: "",
  nombrePastorBautismo: "",
  espiritu: "",
  fechaEspiritu: "",
  cargos: [],
  referenciaPastoral: "",
});

// Abrir previsualización del soporte tribunal
function verSoporte() {
  if (formData.soporteTribunal.endsWith(".pdf")) {
    window.open(formData.soporteTribunal, "_blank");
  } else {
    alert("La previsualización solo está disponible para archivos PDF.");
  }
}

// Abrir el componente de edición
function abrirEditar() {
  estados.formMiembros.mode = "edit";
}

watch(
  () => estados.viewRegistro,
  (newData) => {
    if (newData.display) {
      formData = { ...defaultformData };
      const result = estados.miembros.find(
        (re) => re.numeroDocumento === newData.id
      );

      Object.keys(formData).forEach((key) => {
        formData[key] = result.hasOwnProperty(key)
          ? result[key]
          : formData[key];
      });

      // Analizar y actualizar campos vacíos
      Object.keys(formData).forEach((key) => {
        const value = formData[key];

        if (value === "" || value === null || value === undefined) {
          // Si el valor está vacío, se le asigna "Campo vacío"
          formData[key] = "Campo vacío";
        } else if (Array.isArray(value) && value.length === 0) {
          
        }
      });
      if (formData.foto === "Campo vacío") {
        formData.foto = defaultImg;
      }
    }
  
  }
);

function descargarArchivo(url) {
  // Abrir la URL en una nueva ventana
  window.open(url, "_blank"); // '_blank' abre en nueva pestaña
}
</script>

<style scoped>
.vistaDatos {
  border-bottom: 2px solid rgb(13, 135, 216);
  color: #2c2c2ccc;
  font-weight: bold;
  margin-left: 6px;
}

.subTitles {
  color: #000000;
  font-weight: bold;
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
.text-muted {
  color: gray;
  font-size: 0.875rem;
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

.no-editable-textarea {
  border: none;
  background-color: transparent;
  font-family: "Arial", sans-serif;
  font-size: 16px;
  padding: 5px;
  width: 100%;
  min-height: 80px;
  color: rgb(54, 52, 52);
  white-space: pre-wrap; /* Mantener saltos de línea */
  border: 2px solid rgba(219, 219, 219, 0.721);
  border-radius: 6px;
}
.no-editable-textarea:focus {
  border-color: rgb(13, 135, 216); /* Cambiar a color verde cuando tiene foco */
  outline: none;
}
</style>
