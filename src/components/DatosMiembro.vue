<style scoped>
.inputBox {
  background: rgb(255, 255, 255);
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
  border-radius: 20px;
  border: 1px solid rgb(161, 161, 161);
  display: flex;
  align-items: center;
  align-items: center;
  max-width: 300px; /* Ancho máximo del contenedor */
}

.inputBox label {
  color: #265c8b;
  margin-right: 5px; /* Espacio entre el ícono y el campo de entrada */
}
.labelEye {
  color: #3916ff;
  margin-left: 10px; /* Espacio entre el ícono y el campo de entrada */
}

.inputBox input {
  background: none;
  flex: 1; /* El campo de entrada se expandirá para ocupar el espacio disponible */
  box-sizing: border-box; /* Incluir el tamaño del borde y el relleno en el ancho */
  font-size: 0.9rem;
  border-radius: 4px; /* Bordes redondeados */
  outline: none; /* Eliminar el contorno al enfocar */
  overflow: hidden; /* Ocultar el desbordamiento del input */
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Otros navegadores */
}
.inputBox input[type="number"]::-webkit-inner-spin-button,
.inputBox input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Eliminar las flechas de incremento y decremento en Chrome/Safari */
  margin: 0; /* Asegurar que no haya margen alrededor de las flechas */
}
</style>

<template>
  <v-container>
    <v-form validate-on="submit lazy" @submit.prevent="buscar">
      <div class="inputBox">
        <label><v-icon icon="mdi-magnify" size="20"></v-icon></label>
        <input v-model="searchNumber" type="number" placeholder="Usuario" maxlength="5" />
        <label>
          <button type="submit" color="success"  v-if="!loadingb">Buscar</button>
          <v-progress-circular
          v-if="loadingb"
            color="primary"
            indeterminate
            :size="20"
            :width="2"
          ></v-progress-circular>
        </label>
      </div>
    </v-form>

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
              <strong>Departamento:</strong> {{ dataSede.departamento }}
            </div>
            <div class="my-3">
              <!-- Aplicar espaciado vertical -->
              <strong>Municipio:</strong> {{ dataSede.municipio }}
            </div>
            <div class="my-3">
              <!-- Aplicar espaciado vertical -->
              <strong>Sede:</strong> {{ dataSede.nombre }}
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
            <!-- Aplicar espaciado vertical -->
            <v-btn
              v-if="
                formData.sede === auth.currentUser.email &&
                formData.estado === 'Inhabilitado'
              "
              @click="load2(formData.idDoc)"
              :loading="loading"
              class="flex-grow-1"
              height="48"
              variant="flat"
              color="success"
              :disabled="loading"
              style="text-transform: none"
            >
              <v-icon left>mdi-account-reactivate</v-icon> Activar persona
            </v-btn>
            <p
              v-if="
                formData.sede !== auth.currentUser.email &&
                formData.estado === 'Inhabilitado'
              "
              style="color: #ff5252; font-size: 13px"
            >
              Persona inactiva por ({{ dataSede.nombre }}) por ende no se puede
              enviar una solicitud, para ser solicitado el miembro debe ser
              activado por la sede a la que pertenece.
            </p>

            <div class="my-3" v-if="formData.sede !== auth.currentUser.email">
              <p
                v-if="fil(formData.numeroDocumento)"
                style="color: #ff5252; font-size: 13px"
              >
                El botón se desactivó porque ya le envió una solicitud
              </p>
              <p v-if="userRequerido" style="color: #ff5252; font-size: 13px">
                El botón se desactivó porque otro usuario le envio una
                solicitud.
              </p>
              <v-btn
                style="text-transform: none"
                :disabled="
                  userRequerido ||
                  fil(formData.numeroDocumento) ||
                  formData.estado === 'Inhabilitado'
                "
                @click="load"
                :loading="loading"
                class="flex-grow-1"
                height="48"
                variant="flat"
                color="#6FA55A"
              >
                <v-icon left>mdi-send</v-icon> Solicitar Traslado
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Puedes agregar más secciones para la información adicional si es necesario -->
  </v-container>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useAppStore } from "../store/app";
import {
  collection,
  query,
  where,
  getDoc,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";
import swal from "sweetalert";

const estados = useAppStore();
const idM = ref("");
const loading = ref(false);
const loadingb = ref(false);
const userRequerido = ref(false);
const searchNumber = ref("");
const miembro = ref("");
const documentTypes = [
  "Cedula de Ciudadania",
  "Targeta de identidad",
  "Registro Civil",
  "Cedula Extrangera",
];

const formData = reactive({
  idDoc: "",
  estado: "Activo",
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
  sede: "",
});
const dataSede = ref({
  departamento: "bh",
  municipio: "bgg",
  nombre: "gg",
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

async function load2(doc) {
  // Mostrar una confirmación con SweetAlert

  const willSend = await swal({
    title: "¿Estás seguro?",
    text: "Esto habilitara la persona y sera visible en su base de datos.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });

  // Verificar la respuesta de SweetAlert
  if (willSend) {
    loading.value = true;
    setTimeout(() => {
      activarPersona(doc);
    }, 1500);
  } else {
    // El usuario canceló la confirmación
    swal("Cancelado", "La activacion no se ha realizado.", "info");
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
  
  userRequerido.value = await getDocument(searchNumber.value.toString());
  const q = query(
    collection(db, "Membresia"),
    where("numeroDocumento", "==", searchNumber.value.toString())
  );

  const unsubscribe = await onSnapshot(q, (querySnapshot) => {
    let documentoEncontrado = false;
    querySnapshot.forEach((doc) => {
      documentoEncontrado = true; // Se encontró al menos un documento
      const docData = doc.data();
      docData.idDoc = doc.id;
      miembro.value = docData;
      getSede(docData.sede);
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

//OBTENER DATOS DE X SEDE
async function getSede(v) {
  const docRef = doc(db, "Users", v);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    dataSede.value = docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
//COMPROBAR SI YA ESTA EN SOLICITUDES PENDIENTES
async function getDocument(d) {
  const docRef = doc(db, "Solicitudes", d);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) return true;
  return false;
}

//CREA UNA SOLISITUD
async function enviarSolicitud() {
  try {
    const docRef = await setDoc(doc(db, "Solicitudes", miembro.value.id), {
      miembro: miembro.value.id,
      nombre: miembro.value.nombre + " " + miembro.value.apellido,
      userReceptor: miembro.value.sede,
      userEmisor: auth.currentUser.email,
      fecha: new Date().toISOString().split("T")[0],
      Hora: new Date().toTimeString().split(" ")[0],
    });

    // Si se envió con éxito, muestra un mensaje de éxito
    swal("Éxito!", "Solicitud de traslado enviada con éxito.", "success");
    loading.value = false;
  } catch (error) {
    // Si ocurrió un error, muestra un mensaje de error
    console.log(error);
    swal(
      "Error",
      "Hubo un problema al enviar la solicitud de traslado.",
      "error"
    );
  }
}

async function activarPersona(params) {
  console.log(params);
  try {
    const miembro = doc(db, "Membresia", params);

    await updateDoc(miembro, { estado: "Activo" });
    // Muestra un mensaje de confirmación si se actualizó correctamente
    swal("Éxito!", "Persona habilitada correctamente.", "success");
    loading.value = false;
  } catch (error) {
    // Muestra un mensaje de error si hubo un problema al actualizar
    console.log(error);
    loading.value = false;
    swal("Error!", "Hubo un problema al habilitar la persona.", "error");
  }
}

function fil(n) {
  for (let i = 0; i < estados.solicitudes.length; i++) {
    const objeto = estados.solicitudes[i];
    if (objeto.miembro === n) {
      return true;
    }
  }
  return false;
}


watch(
  () => searchNumber.value,
  (newData,oldData) => {
if(newData.toString().length>14){ searchNumber.value = oldData;}

  });
</script>
