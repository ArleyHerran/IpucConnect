<template>
    <v-dialog v-model="estados.formAmigos.display" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">
          {{
            estados.formAmigos.mode == "add"
              ? "Registrar amigo"
              : estados.formAmigos.mode == "edit"
              ? "Editar amigo"
              : estados.formAmigos.mode == "view"
              ? "Vista"
              : "Texto por defecto"
          }}
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <v-text-field
              label="Nombre"
              v-model="form.nombre"
              :rules="[rules.required, rules.minLength(2), rules.maxLength(30)]"
              outlined
              clearable
            />
            <v-text-field
              label="Apellido"
              v-model="form.apellido"
              :rules="[rules.required, rules.minLength(2), rules.maxLength(30)]"
              outlined
              clearable
            />
            <v-text-field
  label="Fecha de nacimiento"
  v-model="form.fechaNacimiento"
  type="date"
  outlined
  clearable
  hint="La fecha nacimiento es opcional"
  persistent-hint
  style="margin-bottom: 12px;"
/>
            <v-text-field
              label="Celular"
              v-model="form.celular"
              :rules="[rules.required, rules.isNumber, rules.maxLength(15)]"
              type="number"
              outlined
              clearable
            />
          
            <v-checkbox label="Tiene WhatsApp" v-model="form.tieneWhatsapp" />
            <v-text-field
              label="Dirección"
              v-model="form.direccion"
              :rules="[rules.required, rules.maxLength(150)]"
              outlined
              clearable
            />
            <v-textarea
              label="Descripción"
              v-model="form.descripcion"
              :rules="[rules.required, rules.maxLength(500)]"
              outlined
              clearable
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeDialog">
            {{
              estados.formAmigos.mode === "view"
                ? "Cerrar"
                : "Cancelar"
            }}
          </v-btn>
          <v-btn :disabled="!isFormValid" v-if="estados.formAmigos.mode !== 'view'" color="green" text @click="guardarAmigo">
            {{
              estados.formAmigos.mode === "add"
                ? "Guardar"
                : "Guardar Cambios"
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, reactive, computed, watch } from 'vue';
  import { useAppStore } from '../store/app';
  import { auth, db } from "../ConfigFirebase";
  import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  getDocs,
  where,
  serverTimestamp,
} from "firebase/firestore";

import swal from "sweetalert";



  const estados = useAppStore();
  

  const form = reactive({
    id:"",
    sede: '',
    fechaR:'',
    nombre: '',
    apellido: '',
    fechaNacimiento:'',
    celular: '',
    tieneWhatsapp: false,
    direccion:'',
    descripcion: '',
  });
 
  
  const isFormValid = ref(false);
  const rules = {
    required: (value) => !!value || 'Campo requerido.',
    minLength: (min) => (value) => value.length >= min || `Mínimo ${min} caracteres.`,
    maxLength: (max) => (value) => value.length <= max || `Máximo ${max} caracteres.`,
    isNumber: (value) => /^\d+$/.test(value) || 'Solo se permiten números.',
  };
  
  // Validar formulario
  const validarFormulario = () => {
    const nombreValido = rules.required(form.nombre) === true && rules.minLength(2)(form.nombre) === true && rules.maxLength(30)(form.nombre) === true;
    const apellidoValido = rules.required(form.apellido) === true && rules.minLength(2)(form.apellido) === true && rules.maxLength(30)(form.apellido) === true;
    const celularValido = rules.required(form.celular) === true && rules.isNumber(form.celular) === true && rules.maxLength(15)(form.celular) === true;
    const descripcionValida = rules.required(form.descripcion) === true && rules.maxLength(150)(form.descripcion) === true;
  
    isFormValid.value = nombreValido && apellidoValido && celularValido && descripcionValida;
  };
  
  // Observamos los cambios en el formulario para validar en tiempo real
  watch(
    () => ({ ...form }),
    () => validarFormulario(),
    { deep: true }
  );
  // Usamos watch para observar cambios en estados.data y actualizar formData

  watch(
  () => estados.formAmigos,
  (newData) => {
    
    if (
      newData.mode == "view" ||
      (newData.mode == "edit" && newData.id != "")
    ) {
      // Utiliza el método find para buscar el objeto por su ID
      const objet1 = estados.amigos.find(
        (objeto) => objeto.id === newData.id
      );
      form.direccion="";
      form.fechaNacimiento="";
      for (const prop in form) {
        if (objet1.hasOwnProperty(prop)) {
          form[prop] = objet1[prop];
        }
      }
      form.sede=objet1.sede;
      form.fechaR=objet1.fechaR;
      form.id=objet1.id;
    } else {
   clearFormFields();
     
    }
  }
);


  const guardarAmigo = () => {
  
 
  if (!isFormValid.value) return;

  isFormValid.value=true;
  estados.progre = true;
  if (estados.formAmigos.mode === "add") {
  

    form.id= generarIdFecha();
      form.sede=auth.currentUser.email;
      form.fechaR=serverTimestamp();
      const amigo = { ...form};
  //console.log(JSON.parse(JSON.stringify(miembro)));
    guardarRegistro(amigo);
  } else {
    editar();
  }

  };

  //Permite guardar el registro por primera vez en firebase
async function guardarRegistro(d) {
  try {
   
    const docRef = await setDoc(doc(db, "Amigos", d.id), d);
    //clearFormFields();
    estados.progre = false;
    //btnSave.value = false;
    estados.formAmigos = { display: false, mode: "", id: "" };
    // Muestra un mensaje de confirmación si se guardó correctamente
    swal("Éxito!", "El registro se ha guardado correctamente.", "success");
  } catch (error) {
    // Muestra un mensaje de error si hubo un problema al guardar
    estados.progre = false;
    btnSave.value = false;
    swal(
      "Error!",
      "Hubo un problema al guardar el registro en Firebase." + error,
      "error"
    );
  }
}
//Permite guardar modificacion de cualquier miembro
async function editar() {
  try {
    const miembro = doc(db, "Amigos", estados.formAmigos.id);

    //console.log(  {...formData})
    await updateDoc(miembro,form);
    estados.progre = false;
   
    clearFormFields();
    estados.formAmigos = { display: false, mode: "", id: "" };
    // Muestra un mensaje de confirmación si se actualizó correctamente
    swal("Éxito!", "El registro se ha actualizado correctamente.", "success");
  } catch (error) {
    // Muestra un mensaje de error si hubo un problema al actualizar
    estados.progre = false;
    //btnSave.value = false;
    swal(
      "Error!",
      "Hubo un problema al actualizar el registro en Firebase.",
      "error"
    );
  }
}
function clearFormFields() {
  for (const key in form) {
  if (Array.isArray(form[key])) {
    form[key] = [];
  } else if (typeof form[key] === "boolean") {
    // Si es un checkbox, desmarcarlo
    form[key] = false;
  } else {
    form[key] = "";
  }
}
}
  const closeDialog = () => {
    estados.formAmigos.display = false;
  };


  function generarIdFecha() {
  const fechaActual = new Date();
  
  // Obtener los componentes de la fecha y hora
  const dia = String(fechaActual.getDate()).padStart(2, '0');
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
  const año = fechaActual.getFullYear();
  
  const hora = String(fechaActual.getHours()).padStart(2, '0');
  const minuto = String(fechaActual.getMinutes()).padStart(2, '0');
  const segundo = String(fechaActual.getSeconds()).padStart(2, '0');

  // Crear el ID en el formato deseado
  const idFecha = `${dia}${mes}${año}${hora}${minuto}${segundo}`;

  return idFecha;
}
  </script>
  
  <style scoped>
  .text-h5 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  </style>
  