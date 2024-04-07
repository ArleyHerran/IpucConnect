<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-card color="#F2F2F2" max-width="100%" style="border-radius:20px;">
        <v-card-title class="text-center">
          <v-avatar image="../img/icon-ipuc.png" size="52"></v-avatar><br/>
          <span class="headline" style="color:#464646;">Iniciar sesión</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <div class="inputBox">
              <label><v-icon icon="mdi-account" size="25"></v-icon></label>

              <input  v-model="email" type="number" placeholder="Usuario" />
            </div>
            <div class="inputBox">
              <label><v-icon icon="mdi-lock" size="25"></v-icon></label>

              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Contraseña"
               
              />
              <label
              class="labelEye"
                ><v-icon
                  :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  size="25"
                  @click="showPassword = !showPassword"
                ></v-icon
              ></label>
            </div>
            <v-alert v-if="errorl" type="error" class="mb-5"
              >{{ errorl }}
            </v-alert>
            <v-alert v-if="ms" type="success" class="mb-5">{{ ms }} </v-alert>
            <div style="display:flex; padding-top:10px;">
             
              <v-btn
              style="text-transform: none"
              type="submit"
              color="#265c8b"
              class="mx-auto"
              >Ingresar</v-btn
            >
            </div>
            
          </v-form>

          <v-divider class="mb-4 mt-4"></v-divider>
          <h4 style="color: #168ad6">¿Olvido la contraseña?</h4>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../ConfigFirebase";
import { useRouter } from "vue-router";
const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorl = ref();
const ms = ref();

const login = () => {
  errorl.value = "";

  const emails = email.value + "@jahd.com";

  signInWithEmailAndPassword(auth, emails, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      ms.value = "Acceso exitoso";
      setTimeout(function () {
        router.push("/");
      }, 600);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      errorl.value = traducirErrorFirebase(errorCode);
    });
};

const forgotPassword = () => {
  // Implementa la lógica para el restablecimiento de contraseña.
};

////Lib

function traducirErrorFirebase(codigoError) {
  switch (codigoError) {
    case "auth/user-not-found":
      return "Usuario no encontrado. Verifica que el número de usuario sea correcto o solicita un usuario.";
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
    case "auth/invalid-login-credentials":
      return "Credenciales de inicio de sesión inválidas. Verifica la información proporcionada.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Por favor, espera un momento antes de intentarlo de nuevo.";
    default:
      return "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.";
  }
}
</script>
<style scoped>
.inputBox{
  background: transparent;
  margin-top: 20px;
  margin-bottom:20px;
  padding: 10px;
  border-radius: 5px;
  border:1px solid rgb(161, 161, 161);
  display:flex;
  align-items: center;
  align-items: center;
  max-width: 300px; /* Ancho máximo del contenedor */
}

.inputBox label {
  color: #265c8b;
  margin-right:5px; /* Espacio entre el ícono y el campo de entrada */
}
.labelEye {
 color: #3916ff;
  margin-left: 10px; /* Espacio entre el ícono y el campo de entrada */
}

.inputBox input{
  background: none;
  flex: 1; /* El campo de entrada se expandirá para ocupar el espacio disponible */
  box-sizing: border-box; /* Incluir el tamaño del borde y el relleno en el ancho */
  font-size: 1.1rem;
  border-radius: 4px; /* Bordes redondeados */
  outline: none; /* Eliminar el contorno al enfocar */
  overflow: hidden; /* Ocultar el desbordamiento del input */
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Otros navegadores */
 
}
.inputBox input[type="number"]::-webkit-inner-spin-button,
.inputBox input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Eliminar las flechas de incremento y decremento en Chrome/Safari */
  margin: 0; /* Asegurar que no haya margen alrededor de las flechas */
}

.inputBox:focus-within {
  border: 2px solid #265c8b;
}
</style>
