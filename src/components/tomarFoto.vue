<template>
  <div>
    <div class="camera-capture">
      <v-dialog v-model="estados.tomarFoto" max-width="512">
        <v-card>
          <v-card-title>
            <span class="text-h6">Tomar Foto</span>
          </v-card-title>

          <v-card-text>
            <div v-if="!photoCaptured">
              <video ref="video" autoplay playsinline class="camera-view"></video>
            </div>

            <div v-else>
              <img :src="photo" alt="Foto capturada" class="captured-photo" />
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="grey" text @click="closeDialog">Cancelar</v-btn>
            <v-btn v-if="!photoCaptured" color="primary" @click="capturePhoto">Tomar Foto</v-btn>
            <v-btn v-else color="primary" @click="confirmPhoto">Confirmar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css"; // Importar estilos locales
import { useAppStore } from "../store/app";
import { comprimirImagen } from "@/scripts/comprimirImg";

const estados = useAppStore();

// Variables para manejar el estado de la cámara y la foto
const dialog = ref(false);
const photoCaptured = ref(false);
const photo = ref(null);
const videoStream = ref(null);
const video = ref(null);
const cropper = ref(null); // Instancia del CropperJS

// Cerrar el diálogo
const closeDialog = () => {
  estados.tomarFoto = false;
  photoCaptured.value = false;
  photo.value = null;
  stopCamera();
};

// Inicializar la cámara
const initCamera = async () => {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("La cámara no está soportada por este navegador.");
    }

    videoStream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }, // Utiliza la cámara trasera en dispositivos móviles
    });

    video.value.srcObject = videoStream.value;
  } catch (error) {
    if (error.name === "NotAllowedError") {
      alert("Permiso de cámara denegado. Asegúrate de habilitar el acceso a la cámara en la configuración de tu navegador.");
    } else if (error.name === "NotFoundError") {
      alert("No se encontró una cámara disponible.");
    } else {
      alert("Error al acceder a la cámara: " + error.message);
    }
  }
};

// Detener la cámara
const stopCamera = () => {
  if (videoStream.value) {
    const tracks = videoStream.value.getTracks();
    tracks.forEach((track) => track.stop());
  }
};

// Tomar una foto
const capturePhoto = () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.value.videoWidth;
  canvas.height = video.value.videoHeight;
  const context = canvas.getContext("2d");
  context.drawImage(video.value, 0, 0, canvas.width, canvas.height);
  photo.value = canvas.toDataURL("image/png");
  photoCaptured.value = true;
  stopCamera();

  // Iniciar el cropper
  nextTick(() => {
    const imgElement = document.querySelector(".captured-photo");
    cropper.value = new Cropper(imgElement, {
      aspectRatio: 1, // Ajusta la proporción deseada
      viewMode: 1,
    });
  });
};

// Confirmar la foto y obtener la imagen recortada como Blob
const confirmPhoto = async () => {
  if (cropper.value) {
    try {
      const croppedCanvas = cropper.value.getCroppedCanvas();

      // Convertir el lienzo recortado a un Blob
      const blob = await new Promise((resolve) =>
        croppedCanvas.toBlob(
          (blob) => resolve(blob),
          "image/jpeg",
          0.8 // Usamos "image/jpeg" y calidad 0.8
        )
      );

      // Crear un archivo con nombre y extensión a partir del Blob
      const fileWithMetadata = new File([blob], "imagen_recortada.jpg", {
        type: blob.type,
      });

      // Comprimir la imagen si es necesario
      estados.selectImg.img = await comprimirImagen(fileWithMetadata);
      // Crear una URL temporal para el Blob comprimido y asignarla a imageUrl
      estados.selectImg.urlImg = URL.createObjectURL(estados.selectImg.img);
    } catch (error) {
      console.error("Error al confirmar y comprimir la imagen:", error);
    } finally {
      // Destruir el cropper después de usarlo
      cropper.value.destroy();
      cropper.value = null;

      // Cerrar el diálogo
      closeDialog();
    }
  }
};

// Verificar el estado del diálogo y gestionar la cámara
onMounted(() => {
  watch(
    () => estados.tomarFoto,
    (newValue) => {
      if (newValue) {
        initCamera();
      } else {
        stopCamera();
      }
    }
  );
});

onBeforeUnmount(() => {
  stopCamera();
  if (cropper.value) {
    cropper.value.destroy();
  }
});
</script>


<style scoped>
.camera-view {
  width: 100%;
  height: auto;
  background: black;
}

.captured-photo {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
}
</style>
