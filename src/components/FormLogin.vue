<template>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="7">
          <v-card>
            <v-card-title class="text-center">
              <span class="headline">Iniciar sesión</span>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="email" label="Correo electrónico" required></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                

                  required
                ></v-text-field>
                <v-alert v-if="error" type="error" class="mb-5">{{ error }}</v-alert>
                <v-btn type="submit" color="primary"  class="mx-auto" >Ingresar</v-btn>
              </v-form>
              
             
              <v-divider class="mb-4 mt-4"></v-divider>
            <h4>Olvido la contraseña?</h4>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const error = ref();
  
  const login = () => {
    // Implementa la lógica para iniciar sesión con Firebase o la plataforma de autenticación que prefieras.
    // Maneja los errores devueltos por Firebase.
    // Si se produce un error, asigna el mensaje de error a la variable "error".
    // Por ejemplo:
    /*
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        // Inicio de sesión exitoso
      })
      .catch((e) => {
        error.value = e.message;
      });
    */
  };
  
  const forgotPassword = () => {
    // Implementa la lógica para el restablecimiento de contraseña.
  };
  </script>
  