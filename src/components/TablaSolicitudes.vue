<style>
.v-icon.red--text {
  color: rgb(224, 86, 86);
}

.v-icon.green--text {
  color: rgb(97, 187, 97);
}
</style>

<template>
  <div>
    <v-text-field
      v-model="search"
      label="Buscar por nombre o código"
      variant="outlined"
      append-inner-icon="mdi-magnify"
      density="compact"
      style="max-width: 550px; color: aqua"
    />

    <v-btn
      color="primary"
      class="mb-5"
      fab
      dark
      @click="estados.formMiembros = { display: true, mode: 'add', id: '' }"
    >
      <v-icon>mdi-plus</v-icon>
      Agregar miembro
    </v-btn>
    <!-- Agregar el diálogo/modal -->

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
          <td>{{ item.idE === estados.data.id ? "Enviada" : "Recibida" }}</td>
          <td>{{ item.miembro.numeroDocumento }}</td>
          <td>
            {{
              item.miembro.nombre
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")
            }}
            {{
              item.miembro.apellido
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
              v-if="item.idE == estados.data.id"
              color="#F35656"
              @click="cancelarSolicitud(item.docId)"
              >Cancelar solicitud</v-btn
            >
            <v-btn
              v-if="item.idE !== estados.data.id"
              color="green"
              @click="aceptarSolicitud(item.miembro.idDoc, item.idE, item.docId,item.sede)"
              >Aceptar</v-btn
            >
            <v-btn
              v-if="item.idE !== estados.data.id"
              color="#F35656"
              class="ml-1"
              @click="cancelarSolicitud(item.docId)"
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
//import { useRouter } from "vue-router";

const estados = useAppStore();
const currentPage = ref(1);
const itemsPerPage = ref(20);
const search = ref("");
const desserts = ref(estados.solicitudes);

const sortedItems = computed(() => {
  return filteredDesserts.value.sort((a, b) => {
    if (a.numeroDocumento < b.numeroDocumento) {
      return -1;
    }
    if (a.numeroDocumento > b.numeroDocumento) {
      return 1;
    }
    return 0;
  });
});

const filteredDesserts = computed(() => {
  currentPage.value = 1;
  const regex = new RegExp(search.value, "i");
  return desserts.value.filter(
    (item) => regex.test(item.idE) || regex.test(item.idR)
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

async function cancelarSolicitud(id) {
  if (!confirm("Seguro que desea cancelar la Solicitud?")) return;
  await deleteDoc(doc(db, "Solicitudes", id));
}
async function rechazarSolicitud(id) {
  if (!confirm("Seguro que desea rechazar la Solicitud?")) return;
  await deleteDoc(doc(db, "Solicitudes", id));
}

async function eliminarSolicitud(id) {

  await deleteDoc(doc(db, "Solicitudes", id));
}
//id hace referencia al id del comento miembro,
//ide Hace referencia alide del emisor de la solicitud
//ids hace referencia al id de la solicitud para luego borrrarla
//sede es la solicitante y sus datos
async function aceptarSolicitud(id, ide, ids,sede) {
  if (!confirm("Seguro que desea aceptar esta Solicitud?")) return;
  const docRef = doc(db, "Membresia", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await runTransaction(db, async (transaction) => {
      const historia = docSnap.data().historiaTraslados;
      historia.push({
        sede: estados.data,
        fecha: new Date().toISOString().split("T")[0],
        Hora: new Date().toTimeString().split(" ")[0],
      });

      const docRef = doc(db, "Membresia", id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, {
       sede:sede,
        historiaTraslados: historia,
        direccion:"",
        timestamp: serverTimestamp(),
      });

      await eliminarSolicitud(ids);
    });
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
</script>
