<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchNumber"
          label="Número de Documento"
          type="number"
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
        <v-card max-height="auto">
          <v-card-title>Información Personal</v-card-title>
          <v-card-text class="text-h6">
            <div class="my-3">
              <strong>Tipo de Documento:</strong> {{ formData.tipoDocumento }}
            </div>
            <div class="my-3">
              <strong>Número de Documento:</strong>
              {{ formData.numeroDocumento }}
            </div>
            <div class="my-3">
              <strong>ID:</strong>
              {{ formData.sede.id }}
            </div>
            <div class="my-3">
              <strong>Nombre:</strong> {{ formData.nombre }}
            </div>
            <div class="my-3">
              <strong>Apellido:</strong> {{ formData.apellido }}
            </div>
            <div class="my-3"><strong>Rol:</strong> {{ formData.rol }}</div>
            <div class="my-3">
              <strong>Fecha de Nacimiento:</strong>
              {{ formData.fechaNacimiento }}
            </div>

            <!-- Agrega más campos de información personal aquí -->
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Información de Contacto</v-card-title>
          <v-card-text class="text-h6">
            <!-- Aplicar espaciado vertical -->
            <div class="my-3">
              <!-- Aplicar espaciado vertical -->
              <strong>Celular:</strong> {{ formData.celular }}
            </div>
            <div class="my-3">
              <!-- Aplicar espaciado vertical -->
              <strong>Dirección:</strong> {{ formData.direccion }}
            </div>
            <div class="my-3">
              <!-- Aplicar espaciado vertical -->
              <strong>Sexo:</strong> {{ formData.sexo }}
            </div>

            <div class="my-3">
              <!-- Aplicar espaciado vertical -->
              <strong>Estado Civil:</strong> {{ formData.estadoCivil }}
            </div>
            <!-- Agrega más campos de información de contacto aquí -->
            <div class="my-3" v-if="formData.sede.id !== estados.data.id">
              <!-- Aplicar espaciado vertical -->
              <v-btn
                :disabled="fil(formData.numeroDocumento)"
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

              <span
                v-if="fil(formData.numeroDocumento)"
                style="color: rgb(240, 103, 103)"
                >El botón se desactivó porque ya le envió una solicitud</span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Puedes agregar más secciones para la información adicional si es necesario -->
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAppStore } from "../store/app";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";
import swal from "sweetalert";

const estados = useAppStore();
const idM = ref("");
const loading = ref(false);
const loadingb = ref(false);
const searchNumber = ref("");
const miembro = ref("");
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
  sede: {},
});

async function load() {
  // Mostrar una confirmación con SweetAlert

  const willSend = await swal({
    title: "¿Estás seguro?",
    text: "Esto enviará la solicitud de traslado.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });

  // Verificar la respuesta de SweetAlert
  if (willSend) {
    loading.value = true;
    setTimeout(() => {
      enviarSolicitud();
    }, 1500);
  } else {
    // El usuario canceló la confirmación
    swal("Cancelado", "La solicitud de traslado no se ha enviado.", "info");
  }
}

function buscar() {
  if (searchNumber.value == "") {
    swal("Campo vacio !", "", "info");
    return;
  }
  formData.numeroDocumento = "";
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

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let documentoEncontrado = false;

    querySnapshot.forEach((doc) => {
      documentoEncontrado = true; // Se encontró al menos un documento

      const docData = doc.data();
      docData.idDoc = doc.id;
      miembro.value = docData;
      for (const key in formData) {
        if (docData.hasOwnProperty(key)) {
          formData[key] = docData[key]; // Asigna el valor de doc.data() a formData si existe el campo correspondiente
        }
      }
    });

    // Verifica si se encontró algún documento
    if (!documentoEncontrado) {
      swal(
        "",
        "No se encontraron registros con el número de documento especificado.",
        "info"
      );
      // Aquí puedes manejar la lógica correspondiente, como mostrar un mensaje de error.
    } else {
    }

    loadingb.value = false;
  });
}

async function enviarSolicitud() {
  try {
    const docRef = await addDoc(collection(db, "Solicitudes"), {
      miembro: miembro.value,
      idR: miembro.value.sede.id,
      idE: estados.data.id,
      sede: estados.data,
      fecha: new Date().toISOString().split("T")[0],
      Hora: new Date().toTimeString().split(" ")[0],
    });

    // Si se envió con éxito, muestra un mensaje de éxito
    swal("Éxito!", "Solicitud de traslado enviada con éxito.", "success");
    loading.value = false;
  } catch (error) {
    // Si ocurrió un error, muestra un mensaje de error
    swal(
      "Error",
      "Hubo un problema al enviar la solicitud de traslado.",
      "error"
    );
  }
}

function fil(n) {
  for (let i = 0; i < estados.solicitudes.length; i++) {
    const objeto = estados.solicitudes[i];
    if (objeto.miembro.numeroDocumento === n) {
      return true;
    }
  }
  return false;
}
</script>
