<style>
.v-icon.red--text {
  color: rgb(224, 86, 86);
}

.v-icon.green--text {
  color: rgb(97, 187, 97);
}

.option-content {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}

.option-content h2 {
  font-size: 24px;
  margin-bottom: 16px;
}



.custom-select {
  width: 150px; /* Define el ancho del dropdown */
  border: 1px solid #ccc; /* Borde del dropdown */
  border-radius: 4px; /* Esquinas redondeadas */
  padding: 5px; /* Espacio interior del dropdown */
  font-size: 16px; /* Tamaño de la fuente */
}

.custom-select:focus { /* Estilo para el dropdown cuando está en foco */
  border-color: #888; /* Cambia el color del borde al enfocarlo */
  outline: none; /* Elimina el outline predeterminado */
}
</style>

<template>
  <div>
    <v-select
      v-model="modo"
      label="Modo"
      :items="['Todas', 'Recibidas', 'Enviadas']"
      item-title="name"
      style="width: 150px;"
    ></v-select>
   
  
    <v-row dense>
      <v-col
        v-for="(item, index) in displayedItems"
        :key="index"
        cols="12"
        md="4"
        sm="5"
      >
        <v-card
      
          class="mx-auto"
          :color=" item.userEmisor === auth.currentUser.email ? '#385F73' : '#ffffff'"
          max-width="344"
          :subtitle="'ID:' + item.miembro"
          :title="
            item.userEmisor === auth.currentUser.email ? 'Enviada' : 'Recibida'
          "
        >
          <v-card-text style="margin-top: -15px">
            {{
              item.nombre
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
            }}
          </v-card-text>
          <v-card-actions style="margin-top: -20px">

            <v-btn
              size="small"
              variant="tonal"
              class="text-none"
              slim
              v-if="item.userEmisor == auth.currentUser.email"
              color=""
              @click="cancelarSolicitud(item.miembro)"
              >Cancelar solicitud</v-btn
            >
           
            <v-btn
            v-if="item.userEmisor !== auth.currentUser.email"
          class="text-none text-subtitle-1"
          color="primary"
          size="small"
          variant="flat"
          @click="aceptarSolicitud(item)"
        >
          Confirmar
        </v-btn>
            <v-btn
              size="small"
              variant="tonal"
              v-if="item.userEmisor !== auth.currentUser.email"
              color=""
              class="ml-1 text-none"
              @click="rechazarSolicitud(item.miembro)"
              >Eliminar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

   
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAppStore } from "../store/app";
import {
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  runTransaction,
} from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";
import swal from "sweetalert";
//import { useRouter } from "vue-router";

const estados = useAppStore();
const variants = ref([
  "elevated",
  "flat",
  "tonal",
  "outlined",
  "text",
  "plain",
]);
const selectedOption = ref("recibidas"); // Inicialmente seleccionada "Recibidas"
const currentPage = ref(1);
const itemsPerPage = ref(20);
const search = ref("");
const modo = ref("Todas");
const desserts = ref(estados.solicitudes);

const sortedItems = computed(() => {
  return filteredDesserts.value.sort((a, b) => {
    if (a.miembro < b.miembro) {
      return -1;
    }
    if (a.miembro > b.miembro) {
      return 1;
    }
    return 0;
  });
});

const filteredDesserts = computed(() => {
  currentPage.value = 1;
  const regex = modo.value;

  if (regex === "Recibidas") {
    return desserts.value.filter(
      (item) => item.userReceptor === auth.currentUser.email
    );
  }

  if (regex === "Enviadas") {
    return desserts.value.filter(
    (item) => item.userEmisor === auth.currentUser.email
  );
  }
  return desserts.value.filter(
    (item) => true
  );
});

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value);
});
const displayedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedItems.value.slice(start, end);
});

const totalItems = computed(() => filteredDesserts.value.length);

function changePage(page) {
  currentPage.value = page;
}

watch(
  () => estados.solicitudes,
  (newVal, oldVal) => {
    desserts.value = newVal;
  }
);

//CANCELA LA SOLICITUD EL EMISOR
async function cancelarSolicitud(id) {
  const willCancel = await swal({
    title: "¿Seguro que desea cancelar la Solicitud?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });

  if (willCancel) {
    await deleteDoc(doc(db, "Solicitudes", id));
    swal(
      "Solicitud Cancelada",
      "La solicitud ha sido cancelada con éxito.",
      "success"
    );
  } else {
    swal("Operación Cancelada", "La solicitud no ha sido cancelada.", "info");
  }
}
//rECHAZA LA SOLICITUD EL RECEPTOR
async function rechazarSolicitud(id) {
  const willReject = await swal({
    title: "¿Seguro que desea rechazar la Solicitud?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });

  if (willReject) {
    await deleteDoc(doc(db, "Solicitudes", id));
    swal(
      "Solicitud Rechazada",
      "La solicitud ha sido rechazada con éxito.",
      "success"
    );
  } else {
    swal("Operación Cancelada", "La solicitud no ha sido rechazada.", "info");
  }
}

///ACEPTAR LA SOLICITUD QUE NOS HA LLEGADO
async function aceptarSolicitud(solicitud) {
  // Mostrar un mensaje de confirmación con SweetAlert
  const willAccept = await swal({
    title: "¿Seguro que desea aceptar esta Solicitud?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });

  // Si el usuario confirmó la acción
  if (willAccept) {
    // Obtener una referencia al documento de la membresía
    const docRef = doc(db, "Membresia", solicitud.miembro);
    // Obtener un snapshot del documento
    const docSnap = await getDoc(docRef);

    // Si el documento existe
    if (docSnap.exists()) {
      // Ejecutar una transacción en Firestore
      await runTransaction(db, async (transaction) => {
        // Obtener el historial de traslados del miembro
        const historia = docSnap.data().historiaTraslados;

        // Agregar un registro al historial
        historia.push({
          sede: estados.data,
          fecha: new Date().toLocaleDateString(), // Obtiene la fecha actual formateada
          hora: new Date().toLocaleTimeString(),
        });

        // Actualizar los datos del miembro en Firestore
        await updateDoc(docRef, {
          sede: solicitud.userEmisor,
          historiaTraslados: historia,
          direccion: "",
          timestamp: serverTimestamp(),
        });

        // Eliminar la solicitud
        await eliminarSolicitud(solicitud.miembro);
      });

      // Mostrar un mensaje de éxito con SweetAlert
      swal(
        "Solicitud Aceptada",
        "La solicitud ha sido aceptada con éxito.",
        "success"
      );
    } else {
      // Si el documento no existe, mostrar un mensaje de error con SweetAlert
      swal("Error", "No se encontró el documento.", "error");
      console.log("No such document!");
    }
  } else {
    // Si el usuario canceló la acción, mostrar un mensaje informativo con SweetAlert
    swal("Operación Cancelada", "La solicitud no ha sido aceptada.", "info");
  }
}

async function eliminarSolicitud(id) {
  return await deleteDoc(doc(db, "Solicitudes", id));
}
</script>
