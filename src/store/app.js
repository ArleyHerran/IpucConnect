// Utilities
import { defineStore } from "pinia";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";

export const useAppStore = defineStore("app", {
  state: () => ({
    //
    drawerDisplay: false,
    formMiembros: { display: false,mode:"add", id:""},
    data: null,
    miembros: [],
    birthday:[],
  }),
  actions: {
    //TRAE LOS DATOS DEL USUARIO EN SESION.
    async getDataUser() {
      if (this.data !== null) return;
      const id = await auth.currentUser;
      const unsub = onSnapshot(doc(db, "Congregaciones", id.uid), (doc) => {
        this.data = doc.data();
        this.data.id = id.uid;
        //console.log(this.data);
      
        this.getMiembros(id.uid);
      });
    },
    //ME TRAE LA LISTA DE MIEMBROS DE CADA CONGREGACION 
    async getMiembros(id) {
   
      console.log("doc.data()");
      const q = query(
        collection(db, "Membresia"),
        where("idSedeCongregacion", "==", id)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const miembros = [];
        const cumple = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Agrega el ID del documento a los datos
          data.id = doc.id;
         cumple.push({nombre:data.nombre,fechaNacimiento:data.fechaNacimiento,id:data.id})
          miembros.push(data);
         
        });

        if (miembros.length<1) return;
        this.miembros = miembros;
        this.birthday=cumple;
        
      
      });
    },
  },
});
