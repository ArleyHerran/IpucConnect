<template>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="text-center">
              <span class="headline">Iniciar sesión</span>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="email" label="Usuario" type="number" ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
                <v-alert v-if="errorl" type="error" class="mb-5">{{ errorl }} </v-alert>
                <v-alert v-if="ms" type="success" class="mb-5">{{ ms }} </v-alert>
                <v-btn type="submit" color="primary"  class="mx-auto" >Ingresar</v-btn>
              </v-form>
              
             
              <v-divider class="mb-4 mt-4"></v-divider>
            <h4 >Olvido la contraseña?</h4>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth} from "../ConfigFirebase";
  import { useRouter } from "vue-router";
  const router = useRouter();
  
  
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const errorl = ref();
  const ms = ref();

  
  
  const login = () => {
errorl.value=""

const emails= email.value+"@jahd.com"
signInWithEmailAndPassword(auth, emails, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    ms.value="Acceso exitoso"
    setTimeout(function() {
      router.push('/');
}, 600);
 
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    errorl.value=traducirErrorFirebase(errorCode);
  });
  };
  
  const forgotPassword = () => {
    // Implementa la lógica para el restablecimiento de contraseña.
  };


  ////Lib

  function traducirErrorFirebase(codigoError) {
  switch (codigoError) {
    case "auth/user-not-found":
      return "Usuario no encontrado. Verifica que el numero de usuario sea correcto o solicite un usuario.";
    case "auth/wrong-password":
      return "Contraseña incorrecta. Verifica la contraseña e inténtalo de nuevo.";
    case "auth/invalid-email":
      return "Usuario no válido. Asegúrate de que el formato del usuario sea correcto.";
    case "auth/email-already-in-use":
      return "El correo electrónico ya está en uso. Prueba con otro correo electrónico.";
    case "auth/weak-password":
      return "Contraseña débil. La contraseña debe tener al menos 6 caracteres.";
    case "auth/network-request-failed":
      return "Error de red. Comprueba tu conexión a Internet.";
    default:
      return "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.";
  }
}
  </script>
  