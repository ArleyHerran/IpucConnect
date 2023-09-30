import swal from 'sweetalert';
import { loading, enviarSolicitud } from "./DatosMiembro.vue";

export async function load() {
// Mostrar una confirmación con SweetAlert
const willSend = await swal({
title: "¿Estás seguro?",
text: "Esto enviará la solicitud de traslado.",
icon: "warning",
buttons: true,
dangerMode: true,
});

// Verificar la respuesta de SweetAlert
if (willSend) {

loading.value = true;
setTimeout(() => {
enviarSolicitud();
}, 1500);

} else {
// El usuario canceló la confirmación
swal("Cancelado", "La solicitud de traslado no se ha enviado.", "info");
}
}
