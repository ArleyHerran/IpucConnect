//Elimina Miembros
import { doc, deleteDoc, setDoc, runTransaction } from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";
import swal from "sweetalert";
import { useAppStore } from "../store/app";
const estados = useAppStore();
export async function eliminarM(m) {
    
    const confirmacion = await swal({
      title: "¿Seguro que desea eliminar este registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      buttons: ["Cancelar", "Sí, eliminar"],
      dangerMode: true,
    });
  
    if (!confirmacion) return;
  
    estados.progre = true;
    try {
      await runTransaction(db, async (transaction) => {
        await setDoc(doc(db, "PapeleraMiembros", m.numeroDocumento), m);
        await deleteDoc(doc(db, "Membresia", m.numeroDocumento));
      });
      estados.progre = false;
      swal("Eliminación exitosa", "", "success");
    } catch (e) {
      estados.progre = false;
      swal("Ocurrió un error", `${e}`, "error");
    }
  }
  export async function eliminarA(m) {
   
    const confirmacion = await swal({
      title: "¿Seguro que desea eliminar este registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      buttons: ["Cancelar", "Sí, eliminar"],
      dangerMode: true,
    });
  
    if (!confirmacion) return;
  
    estados.progre = true;
    try {
      await runTransaction(db, async (transaction) => {
        await setDoc(doc(db, "PapeleraAmigos", m.id), m);
        await deleteDoc(doc(db, "Amigos", m.id));
      });
      estados.progre = false;
      swal("Eliminación exitosa", "", "success");
    } catch (e) {
      estados.progre = false;
      swal("Ocurrió un error", `${e}`, "error");
    }
  }
  
  