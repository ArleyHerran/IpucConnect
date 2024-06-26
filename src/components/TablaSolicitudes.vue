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


</style>

<template>
  <div>
  <v-select  v-model="modo" label="Modo" :items="['Recibidas','Enviadas']" item-title="name"> 
  </v-select>
    <v-table
      dense
      :sort-by="'Codigo'"
      :sort-desc="false"
      theme="dark"
      style="border: 1px solid #767575"
    >
      <thead>
        <tr>
          <th class="text-left">Tipo</th>
          <th class="text-left">Documento</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in displayedItems" :key="index">
          <td>{{ item.userEmisor === auth.currentUser.email ? "Enviada" : "Recibida" }}</td>
          <td>{{ item.miembro}}</td>
          <td>
            {{
              item.nombre
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
            }}
            
          </td>

          <td>
            <v-btn
              v-if="item.userEmisor == auth.currentUser.email"
              color="#F35656"
              @click="cancelarSolicitud(item.miembro)"
              >Cancelar solicitud</v-btn
            >
            <v-btn
              v-if="item.userEmisor !== auth.currentUser.email"
              color="green"
              @click="aceptarSolicitud(item)"
              >Aceptar</v-btn
            >
            <v-btn
              v-if="item.userEmisor !== auth.currentUser.email"
              color="#F35656"
              class="ml-1"
              @click="rechazarSolicitud(item.miembro)"
              >Rechazar</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="5"
      :ellipsis="null"
      :boundary-links="false"
      @input="changePage"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      style="border: 1px solid #767575; color: rgb(0, 0, 0)"
    />
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
import swal from 'sweetalert';
//import { useRouter } from "vue-router";

const estados = useAppStore();

const selectedOption=ref( 'recibidas') // Inicialmente seleccionada "Recibidas"
const currentPage = ref(1);
const itemsPerPage = ref(20);
const search = ref("");
const modo = ref("Recibidas");
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


  if(regex==="Recibidas"){
    return desserts.value.filter(
    (item) => item.userReceptor ===auth.currentUser.email
  );

  }
  return desserts.value.filter(
    (item) => item.userEmisor ===auth.currentUser.email
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
    swal("Solicitud Cancelada", "La solicitud ha sido cancelada con éxito.", "success");
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
    swal("Solicitud Rechazada", "La solicitud ha sido rechazada con éxito.", "success");
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
      swal("Solicitud Aceptada", "La solicitud ha sido aceptada con éxito.", "success");
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
