
//RETORNAR LA PRIMERA LETRA DE CADA PALABREA DE UN TEXTO EN MAYUSCULA
export function capitalizeWords(text) {
    return text
      .split(' ') // Divide el texto en palabras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza la primera letra de cada palabra
      .join(' '); // Vuelve a unir las palabras con un espacio
  }
 //FECHA A TEXTO
  export function formatFecha(fecha) {
    // Crear un objeto Date con la fecha dada
    const fechaObj = new Date(fecha);
  
    // Crear un array con los nombres de los meses
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    // Extraer el día, mes y año de la fecha
    const dia = fechaObj.getDate();
    const mes = meses[fechaObj.getMonth()];
    const año = fechaObj.getFullYear();
  
    // Retornar la fecha formateada
    return `${dia+1} de ${mes} del  año ${año}`;
  }