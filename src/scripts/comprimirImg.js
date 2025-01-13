export async function comprimirImagen(fileWithMetadata) {
    // Tamaño límite en bytes (40 KB)
    const TAMANO_LIMITE = 40960;
  
    // Verificar si el tamaño ya es menor o igual al límite
    if (fileWithMetadata.size <= TAMANO_LIMITE) {
      //console.log("El archivo ya está dentro del límite, no se comprimirá.");
      return fileWithMetadata;
    }
  
    return new Promise((resolve, reject) => {
      // Crear una imagen a partir del archivo
      const img = new Image();
      const imageUrl = URL.createObjectURL(fileWithMetadata);
      img.src = imageUrl;
  
      img.onload = async () => {
        try {
          // Crear un canvas para redimensionar/comprimir la imagen
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          // Asignar dimensiones originales al canvas
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          // Reducir la calidad hasta que el tamaño esté por debajo del límite
          let calidad = 0.9; // Calidad inicial
          let resultado;
  
          do {
            resultado = await new Promise((res) =>
              canvas.toBlob(
                (compressedBlob) => res(compressedBlob),
                "image/jpeg",
                calidad
              )
            );
            calidad -= 0.1; // Reducir calidad gradualmente
          } while (resultado.size > TAMANO_LIMITE && calidad > 0); // Comprimir hasta cumplir el tamaño
  
          // Crear un nuevo archivo comprimido con el Blob resultante
          const compressedFile = new File([resultado], fileWithMetadata.name, {
            type: "image/jpeg",
          });
  
          // Liberar la URL temporal
          URL.revokeObjectURL(imageUrl);
  
          // Devolver el archivo comprimido
          resolve(compressedFile);
        } catch (error) {
          reject("Error durante la compresión: " + error.message);
        }
      };
  
      img.onerror = (error) => {
        reject("Error al cargar la imagen: " + error.message);
      };
    });
  }
  