<template>
    <v-container>
      <v-form ref="form" @submit.prevent="handleSubmit" :model-value="isValid" class="py-4">
        <!-- Fotografía -->
        <v-row>
          <v-col cols="12" class="text-center">
            <v-avatar size="120" :image="formData.foto || defaultImage"></v-avatar>
            <v-btn @click="selectImage">Subir Foto</v-btn>
          </v-col>
        </v-row>
  
        <!-- Información Personal -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.tipoDocumento" label="Tipo de Documento" :rules="[requiredRule]" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.numeroDocumento" label="Número de Documento" :rules="[requiredRule, numberRule]" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.nombre" label="Nombre" :rules="[requiredRule]" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.apellido" label="Apellido" :rules="[requiredRule]" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.lugarNacimineto" label="Lugar de Nacimiento" :rules="[requiredRule]" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.celular" label="Celular" :rules="[requiredRule, numberRule]" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.email" label="Email" :rules="[requiredRule, emailRule]" />
          </v-col>
        </v-row>
  
        <!-- Estado Civil -->
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="formData.estadoCivil"
              :items="estadoCivilOptions"
              label="Estado Civil"
              :rules="[requiredRule]"
              @change="handleEstadoCivilChange"
            />
          </v-col>
  
          <v-col v-if="showEnteMatrimonial" cols="12" md="6">
            <v-text-field v-model="formData.enteMatrimonial" label="Ente Matrimonial" :rules="[requiredRule]" />
          </v-col>
  
          <v-col v-if="showTribunalFields" cols="12" md="6">
            <v-text-field v-model="formData.tribunalEclesiastico" label="Tribunal Eclesiástico" :rules="[requiredRule]" />
          </v-col>
          <v-col v-if="showTribunalFields" cols="12" md="6">
            <v-text-field v-model="formData.conceptoTribunal" label="Concepto Tribunal" :rules="[requiredRule]" />
          </v-col>
          <v-col v-if="showTribunalFields" cols="12" md="6">
            <v-text-field v-model="formData.soporteTribunal" label="Soporte Tribunal" :rules="[requiredRule]" />
          </v-col>
        </v-row>
  
        <!-- Discapacidad -->
        <v-row>
          <v-col cols="12" md="6">
            <v-radio-group v-model="formData.discapacitado" label="¿Tiene Discapacidad?" @change="handleDiscapacidadChange">
              <v-radio label="Sí" value="Sí" />
              <v-radio label="No" value="No" />
            </v-radio-group>
          </v-col>
  
          <v-col v-if="formData.discapacitado === 'Sí'" cols="12" md="6">
            <v-select
              v-model="formData.discapacidad"
              :items="tiposDiscapacidad"
              label="Tipo de Discapacidad"
              @change="handleTipoDiscapacidadChange"
              :rules="[requiredRule]"
            />
          </v-col>
  
          <v-col v-if="formData.discapacidad === 'Otra'" cols="12">
            <v-textarea v-model="formData.descripcionDiscapacidad" label="Descripción de Discapacidad" :rules="[requiredRule]" />
          </v-col>
        </v-row>
  
        <!-- Hijos -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="formData.numeroHijos" label="Número de Hijos" type="number" @change="handleNumeroHijosChange" />
          </v-col>
  
          <v-col v-if="formData.numeroHijos > 0" cols="12">
            <v-textarea v-model="formData.listaHijos" label="Lista de Hijos" :rules="[requiredRule]" />
          </v-col>
        </v-row>
  
        <!-- Bautismo -->
        <v-row>
          <v-col cols="12" md="6">
            <v-radio-group v-model="formData.esBautizado" label="¿Es Bautizado?" @change="handleBautismoChange">
              <v-radio label="Sí" value="true" />
              <v-radio label="No" value="false" />
            </v-radio-group>
          </v-col>
  
          <v-col v-if="formData.esBautizado === 'true'" cols="12" md="6">
            <v-text-field v-model="formData.fechaBautismo" label="Fecha de Bautismo" type="date" :rules="[requiredRule]" />
          </v-col>
  
          <v-col v-if="formData.esBautizado === 'true'" cols="12" md="6">
            <v-text-field v-model="formData.nombrePastorBautismo" label="Pastor Bautizo" :rules="[requiredRule]" />
          </v-col>
        </v-row>
  
        <!-- Botón Guardar -->
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn :disabled="!isValid" @click="handleSubmit">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { reactive, computed } from "vue";
  
  const defaultImage = "https://via.placeholder.com/120";
  const formData = reactive({
    foto: "",
    estado: "Activo",
    tipoDocumento: "",
    numeroDocumento: "",
    nombre: "",
    apellido: "",
    lugarNacimineto: "",
    celular: "",
    email: "",
    estadoCivil: "",
    enteMatrimonial: "",
    tribunalEclesiastico: "",
    conceptoTribunal: "",
    soporteTribunal: "",
    discapacitado: "",
    discapacidad: "",
    descripcionDiscapacidad: "",
    numeroHijos: 0,
    listaHijos: "",
    esBautizado: false,
    fechaBautismo: "",
    nombrePastorBautismo: "",
  });
  
  const estadoCivilOptions = ["Casado/a", "Soltero/a", "Viudo/a", "Divorciado/a"];
  const tiposDiscapacidad = ["Física", "Visual", "Auditiva", "Intelectual", "Otra"];
  
  const requiredRule = (value) => !!value || "Este campo es obligatorio.";
  const numberRule = (value) => !isNaN(value) || "Debe ser un número válido.";
  const emailRule = (value) => /.+@.+\..+/.test(value) || "Debe ser un email válido.";
  
  const isValid = computed(() => Object.values(formData).every((field) => !!field));
  
  const handleEstadoCivilChange = () => {
    if (formData.estadoCivil === "Casado/a" || formData.estadoCivil === "Viudo/a") {
      formData.enteMatrimonial = "";
    } else if (formData.estadoCivil === "Divorciado/a") {
      formData.tribunalEclesiastico = "";
      formData.conceptoTribunal = "";
      formData.soporteTribunal = "";
    } else {
      formData.enteMatrimonial = "";
      formData.tribunalEclesiastico = "";
      formData.conceptoTribunal = "";
      formData.soporteTribunal = "";
    }
  };
  
  const handleDiscapacidadChange = () => {
    if (formData.discapacitado === "No") {
      formData.discapacidad = "";
      formData.descripcionDiscapacidad = "";
    }
  };
  
  const handleTipoDiscapacidadChange = () => {
    if (formData.discapacidad !== "Otra") {
      formData.descripcionDiscapacidad = "";
    }
  };
  
  const handleNumeroHijosChange = () => {
    if (formData.numeroHijos <= 0) {
      formData.listaHijos = "";
    }
  };
  
  const handleBautismoChange = () => {
    if (formData.esBautizado === "false") {
      formData.fechaBautismo = "";
      formData.nombrePastorBautismo = "";
    }
  };
  
  const handleSubmit = () => {
    console.log("Formulario enviado:", formData);
  };
  </script>
  
  <style>
  /* Agrega estilos personalizados si los necesitas */
  </style>
  