// Utilities
import { defineStore } from "pinia";
import { doc, onSnapshot, collection, query, where,or } from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";

export const useAppStore = defineStore("app", {
  state: () => ({
    //
    drawerDisplay: false,
    formMiembros: { display: false,mode:"add", id:""},
    data: null,
    miembros: [],
    birthday:[],
    solicitudes:[],
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
        this.getSolicitudes(id.uid);
      });
    },
    //ME TRAE LA LISTA DE MIEMBROS DE CADA CONGREGACION 
    async getMiembros(id) {
   
      const q = query(
        collection(db, "Membresia"),
        where("sede.id", "==", id)
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
        this.miembros = miembros;
        this.birthday=cumple;
        
      
      });
    },
    //ME TRAE LA LISTA DE SOLICITUDES ENVIADAS Y RECIVIDAS
    async getSolicitudes(id) {
      const q = query(
        collection(db, "Solicitudes"),
        or(
          where("idE", "==",id),
          where("idR", "==", id)
        )
      );
     
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const solicitudes= [];
      
        querySnapshot.forEach((doc) => {

          const data = doc.data();
          data.docId=doc.id;
          solicitudes.push(data);
      
         
        });

      
        this.solicitudes =solicitudes;
      
     
        
      
      });
    },
  },
});
