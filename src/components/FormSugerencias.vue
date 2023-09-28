<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-h5">Enviar Sugerencia o Reportar Error</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="enviarSugerencia">
              <v-select
                v-model="tipoFeedback"
                :items="tiposFeedback"
                label="Tipo de Feedback"
                required
              ></v-select>
              <v-textarea
                v-model="sugerencia"
                label="Comentario"
                hint="Máximo 300 caracteres"
                :counter="300"
                required
              ></v-textarea>
              <v-alert v-if="error" type="error">{{ error }}</v-alert>
  
              <!-- Coloca el contador regresivo en lugar del botón "Enviar" -->
              <div style="width: 100%; text-align: right;">
                <div v-if="!puedeEnviar">
                  <p>Puedes enviar otra sugerencia en: {{ tiempoRestanteFormateado }}</p>
                </div>
                <v-btn
                  v-else
                  color="primary"
                  type="submit"
                  class="text-right mt-4"
                  :disabled="!puedeEnviar"
                >
                  Enviar
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, watch,onUnmounted } from "vue";
import { useAppStore } from "../store/app";
import { useRouter } from "vue-router";
import { collection, addDoc, serverTimestamp,} from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";

const estados = useAppStore();
const router = useRouter();


const sugerencia = ref('');
const error = ref('');
const tipoFeedback = ref(null);
const tiposFeedback = ['Sugerencia', 'Reportar Error'];

var ultimaMarcaDeTiempo = localStorage.getItem('ultimaMarcaDeTiempo');
const limiteDeTiempo = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
var tiempoTranscurrido = ref(calcularTiempoTranscurrido(ultimaMarcaDeTiempo));
var puedeEnviar = ref(tiempoTranscurrido.value >= limiteDeTiempo);

var tiempoRestante = ref(calcularTiempoRestante());

var  tiempoRestanteFormateado = ref(
  formatearTiempo(tiempoRestante.value)
);

// Cada segundo, actualiza el tiempo restante
function iniciarActualizacionDeContador() {
  const intervalId = setInterval(() => {
    tiempoTranscurrido.value = calcularTiempoTranscurrido(ultimaMarcaDeTiempo);
    puedeEnviar.value = tiempoTranscurrido.value >= limiteDeTiempo;
    tiempoRestante.value = calcularTiempoRestante();
    tiempoRestanteFormateado.value = formatearTiempo(tiempoRestante.value);
  }, 1000);

  return intervalId;
}
const intervalId = iniciarActualizacionDeContador();

function calcularTiempoTranscurrido(ultimaMarcaDeTiempo) {
  if (!ultimaMarcaDeTiempo) {
    return Infinity;
  }
  const ahora = Date.now();
  return ahora - parseInt(ultimaMarcaDeTiempo);
}

function calcularTiempoRestante() {
  const tiempoRestante = Math.max(0, limiteDeTiempo - tiempoTranscurrido.value);
  return tiempoRestante;
}

function formatearTiempo(tiempo) {
  const segundos = Math.floor(tiempo / 1000) % 60;
  const minutos = Math.floor(tiempo / 1000 / 60) % 60;
  const horas = Math.floor(tiempo / 1000 / 3600);
  return `${horas.toString().padStart(2, '0')}:
          ${minutos.toString().padStart(2, '0')}:
          ${segundos.toString().padStart(2, '0')}`;
}

// Función para enviar una sugerencia
const enviarSugerencia = () => {
  if (!tipoFeedback.value) {
    error.value = 'Seleccione un tipo de feedback';
    return;
  }

  if (sugerencia.value.trim() === '') {
    error.value = 'El comentario no puede estar vacío';
    return;
  }

  if (sugerencia.value.length > 300) {
    error.value = 'El comentario no puede superar los 300 caracteres';
    return;
  }

  if (!puedeEnviar.value) {
    error.value = 'Debes esperar 24 horas antes de enviar otra sugerencia.';
    return;
  }

  localStorage.setItem('ultimaMarcaDeTiempo', Date.now().toString());
  enviarSugerenciadb()
  sugerencia.value = '';
  tipoFeedback.value = null;
  error.value = '';
};

// Limpiar el intervalo cuando se desmonta el componente
onUnmounted(() => {
  clearInterval(intervalId);
});


async  function enviarSugerenciadb(){
  const d={
    tipo: tipoFeedback.value,
    ms:sugerencia.value,
    user:estados.data,
    timestamp: serverTimestamp(),

  }
  
  const docRef = await addDoc(collection(db, "Sugerencias"), d);
  localStorage.setItem('ultimaMarcaDeTiempo', Date.now().toString());
  ultimaMarcaDeTiempo = localStorage.getItem('ultimaMarcaDeTiempo');
  var tiempoTranscurrido = ref(calcularTiempoTranscurrido(ultimaMarcaDeTiempo));
var puedeEnviar = ref(tiempoTranscurrido.value >= limiteDeTiempo);
 
  
 tiempoRestante = ref(calcularTiempoRestante());
  tiempoRestanteFormateado = ref(
  formatearTiempo(tiempoRestante.value)
);
const intervalId = iniciarActualizacionDeContador();
  alert("Sugerencia enviada");
 
}
</script>

  