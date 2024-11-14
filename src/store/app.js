// Utilities
import { defineStore } from "pinia";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  query,
  where,
  or,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../ConfigFirebase";

export const useAppStore = defineStore("app", {
  state: () => ({
    //
    drawerDisplay: false,
    formMiembros: { display: false, mode: "add", id: "" },
    formAmigos: { display: false, mode: "add", id: "" },
    progre: false,
    data: null,
    miembros: [],
    amigos:[],
    birthday: [],
    solicitudes: [],
    notificaciones: { value: 0, solicitudes: 0, informacion: 0 },
  }),
  actions: {
    //TRAE LOS DATOS DEL USUARIO EN SESION.
    async getDataUser() {
      if (this.data !== null) return;
      const user = await auth.currentUser;
      // console.log(user);
      const unsub = onSnapshot(doc(db, "Users", user.email), (doc) => {
        this.data = doc.data();

        if (doc.data().rol == "admin") {
          return;
        }
        this.getMiembros(user.email);
        this.getAmigos(user.email);
        this.getSolicitudes(user.email);
      });
    },
    //ME TRAE LA LISTA DE MIEMBROS DE CADA CONGREGACION
    async getMiembros(email) {
      const q = query(
        collection(db, "Membresia"),
        where("sede", "==", email),
        where("estado", "==", "Activo")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const miembros = [];
        const cumple = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Agrega el ID del documento a los datos
          cumple.push({
            nombre: data.nombre + " " + data.apellido,
            fechaNacimiento: data.fechaNacimiento,
            id: doc.id,
            sexo: data.sexo,
          });
          // this.actualizar(data.id,data.sede.user)
          miembros.push(data);
        });

        this.miembros = miembros;
        this.birthday = cumple;
        var personasList=[];
        for (const i in miembros) {
         personasList.push({
          n:miembros[i].nombre+" "+miembros[i].apellido,
          f:miembros[i].fechaNacimiento
        });

        }
        
        const datosJSON = JSON.stringify(personasList);
        // Guarda los datos en localStorage
         auxPersonas=datosJSON;
      });
    },
    //ME TRAE LA LISTA DE AMIGOS
    async getAmigos(email) {
      const q = query(
        collection(db, "Amigos"),
        where("sede", "==", email)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const amigos = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          amigos.push(data);
        });

        this.amigos = amigos;
    
      });
    },
    //ME TRAE LA LISTA DE SOLICITUDES ENVIADAS Y RECIVIDAS
    async getSolicitudes(email) {
      const q = query(
        collection(db, "Solicitudes"),
        or(where("userEmisor", "==", email), where("userReceptor", "==", email))
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const solicitudes = [];
        this.notificaciones.solicitudes = 0;
        querySnapshot.forEach((doc) => {
          solicitudes.push(doc.data());
          if (doc.data().userEmisor !== auth.currentUser.email) {
            this.notificaciones.solicitudes++;
          }
        });
        this.notificaciones.value =
          this.notificaciones.solicitudes + this.notificaciones.informacion;

        this.solicitudes = solicitudes;
      });
    },

    async actualizar(dc, u) {
      const washingtonRef = doc(db, "Membresia", dc);
      await updateDoc(washingtonRef, {
        sede: u,
      });
    },
  },
});
