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
    notificaciones:{value:0,solicitudes:0,informacion:0},
  }),
  actions: {
    //TRAE LOS DATOS DEL USUARIO EN SESION.
    async getDataUser() {
      if (this.data !== null) return;
      const user = await auth.currentUser;
      const unsub = onSnapshot(doc(db, "Congregaciones", user.email), (doc) => {
        this.data = doc.data();
      
      
       this.getMiembros(user.email);
       this.getSolicitudes(user.email);
      });
    },
    //ME TRAE LA LISTA DE MIEMBROS DE CADA CONGREGACION 
    async getMiembros(email) {
   
      const q = query(
        collection(db, "Membresia"),
        where("sede.user", "==", email),
        where("estado", "==", "Activo")
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
    async getSolicitudes(email) {
      const q = query(
        collection(db, "Solicitudes"),
        or(
          where("userE", "==",email),
          where("userR", "==", email)
        )
      );
     
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const solicitudes= [];
        this.notificaciones.solicitudes=0
        querySnapshot.forEach((doc) => {

          const data = doc.data();
          data.docId=doc.id;
          solicitudes.push(data);
          if(data.userE!==this.data.user){this.notificaciones.solicitudes++;}
         
        });
        this.notificaciones.value=this.notificaciones.solicitudes+this.notificaciones.informacion;
      
        this.solicitudes =solicitudes;
      
     
        
      
      });
    },
  },
});
