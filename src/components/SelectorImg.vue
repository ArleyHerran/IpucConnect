<template>
  <div>
    <!-- Diálogo -->
    <v-dialog v-model="estados.selectImg.display" max-width="800">
      <v-card>
        <v-card-title>
          <span class="text-h6">Subir y Recortar Imagen</span>
        </v-card-title>

        <v-card-text>
          <!-- Input para seleccionar archivo -->
          <v-file-input
            label="Seleccionar Imagen"
            accept="image/*"
            v-model="selectedImage"
            outlined
            dense
            @change="handleFileChange"
          ></v-file-input>

          <!-- Área para el recorte -->
          <div v-if="imageSrc" class="cropper-container">
            <img ref="image" :src="imageSrc" alt="Imagen para recortar" />
          </div>
        </v-card-text>

        <v-card-actions>
          <!-- Botón para cerrar -->
          <v-btn color="grey" text @click="closeDialog">Cancelar</v-btn>

          <!-- Botón para confirmar recorte -->
          <v-btn color="primary" @click="cropImage" :disabled="!imageSrc">
            Confirmar Recorte
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { useAppStore } from "../store/app";
import {comprimirImagen} from "@/scripts/comprimirImg";// Asegúrate de importar tu función de compresión.

const estados = useAppStore();
// Variables reactivas

const selectedImage = ref(null);
const imageSrc = ref(null);
let cropper = null;

// Cargar la biblioteca de Cropper.js desde la CDN en onMounted
onMounted(() => {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js";
  script.onload = () => {
    //console.log("Cropper.js cargado");
  };
  document.head.appendChild(script);

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css";
  document.head.appendChild(link);
});

// Métodos
const handleFileChange = () => {
  if (selectedImage.value) {
    const file = selectedImage.value[0]; // Usamos el primer archivo en el array
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageSrc.value = e.target.result;

        // Destruir el cropper anterior si existe
        if (cropper) {
          cropper.destroy();
          cropper = null;
        }

        // Esperar a que la imagen cargue antes de inicializar CropperJS
        nextTick(() => {
          const imageElement = document.querySelector(".cropper-container img");
          cropper = new window.Cropper(imageElement, {
            aspectRatio: 1, // Cuadrado
            viewMode: 1, // Ajustar la imagen al contenedor
            dragMode: "move", // Modo de arrastre para mover la imagen
            autoCropArea: 0.8, // Usar un área de recorte más grande
            background: true, // Mostrar el fondo del área de recorte
            responsive: true, // Hacer que el recorte sea sensible a los cambios
            zoomable: true, // Permitir hacer zoom en la imagen
            rotatable: true, // Permitir rotar la imagen
            guides: true, // Mostrar las guías para el recorte
            cropBoxResizable: false, // Deshabilitar redimensionamiento del área de recorte
            cropBoxMovable: true, // Habilitar el movimiento del área de recorte
            minContainerWidth: 300, // Ancho mínimo para el contenedor
            minContainerHeight: 300, // Altura mínima para el contenedor
            center: true, // Centrar la imagen dentro del área de recorte
          });
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert(
        "Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF, etc.)."
      );
      selectedImage.value = null; // Limpiar el archivo seleccionado
    }
  } else {
    alert("Por favor selecciona un archivo de imagen.");
  }
};


const cropImage = async () => {
  if (cropper) {
    try {
      const canvas = cropper.getCroppedCanvas({
        width: 500, // Resolución 500x500
        height: 500,
      });

      // Convertir el canvas a un Blob
      const blob = await new Promise((resolve) =>
        canvas.toBlob(
          (blob) => resolve(blob),
          "image/jpeg",
          0.8 // Calidad 80%
        )
      );

      if (blob) {
        // Crear un archivo con nombre y extensión a partir del Blob
        const fileWithMetadata = new File([blob], "imagen_recortada.jpg", {
          type: blob.type,
        });

        // Comprimir la imagen si es necesario
        const compressedImage = await comprimirImagen(fileWithMetadata);
        //console.log(compressedImage.size);
        // Guardar el archivo en estados
        estados.selectImg.img = compressedImage;
        // Crear una URL para el archivo comprimido y asignarla al estado
        estados.selectImg.urlImg = URL.createObjectURL(compressedImage);
        // Cerrar el diálogo
        closeDialog();
      }
    } catch (error) {
      console.error("Error al recortar y comprimir la imagen:", error);
    } finally {
      // Limpiar o realizar cualquier acción adicional si es necesario
    }
  }
};


const closeDialog = () => {
  estados.selectImg.display = false;
  selectedImage.value = null;
  imageSrc.value = null;

  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
};
</script>

<style scoped>
/* Estilos para el contenedor de la imagen */
.cropper-container {
  position: relative;
  max-width: 100%;
  max-height: 500px; /* Aseguramos que el contenedor tenga suficiente tamaño */
  overflow: hidden;
  margin: auto;
  text-align: center;
  background-color: #f0f0f0;
  padding: 10px;
}

/* Estilo para la imagen cargada */
.cropper-container img {
  display: block;
  width: 100%;
  height: auto;
  margin: auto;
}
</style>
