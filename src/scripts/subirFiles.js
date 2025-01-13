import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../ConfigFirebase";

export const uploadFile = async (path,img) => {
  try {
    // Crear una referencia al archivo en Firebase Storage
    const storageRef = ref(storage, path); // Combina la ruta y el nombre del archivo
    const snapshot = await uploadBytes(storageRef, img);

    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    return [true,downloadURL];
  } catch (error) {
    return [false,error];
  }
};




