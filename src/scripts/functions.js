
//FILTRAR PERSONAS POR CRITERIOS DEL USUARIO,(ESTADO:OKEY)
export function filtrara(params,filtro) {
    if (filtro.value.length === 0) {
      return params;
    }
  
    let filteredList = [...params];
    var list = [];
    if (filtro.value.includes("Hombres")) {
      list = filteredList.filter((item) => item.sexo === "Hombre");
    }
  
    if (filtro.value.includes("Mujeres")) {
      list = [...list, ...filteredList.filter((item) => item.sexo === "Mujer")];
    }
  
    if (!filtro.value.includes("Mujeres") && !filtro.value.includes("Hombres")) {
      list = filteredList;
    }
  
    var listab = [];
    if (filtro.value.includes("Ancianos")) {
      listab = [
        ...listab,
        ...list.filter((item) => calculateAge(item.fechaNacimiento) >= 65),
      ];
    }
  
    if (filtro.value.includes("Adultos")) {
      listab = [
        ...listab,
        ...list.filter(
          (item) =>
            calculateAge(item.fechaNacimiento) >= 36 &&
            calculateAge(item.fechaNacimiento) <= 64
        ),
      ];
    }
  
    if (filtro.value.includes("Jovenes")) {
      listab = [
        ...listab,
        ...list.filter(
          (item) =>
            calculateAge(item.fechaNacimiento) >= 18 &&
            calculateAge(item.fechaNacimiento) <= 35
        ),
      ];
    }
  
    if (filtro.value.includes("Adolecentes")) {
      listab = [
        ...listab,
        ...list.filter(
          (item) =>
            calculateAge(item.fechaNacimiento) >= 12 &&
            calculateAge(item.fechaNacimiento) <= 17
        ),
      ];
    }
  
    if (filtro.value.includes("Niños")) {
      listab = [
        ...listab,
        ...list.filter(
          (item) =>
            calculateAge(item.fechaNacimiento) >= 0 &&
            calculateAge(item.fechaNacimiento) <= 11
        ),
      ];
    }
  
    if (
      !filtro.value.includes("Ancianos") &&
      !filtro.value.includes("Adultos") &&
      !filtro.value.includes("Jovenes") &&
      !filtro.value.includes("Adolecentes") &&
      !filtro.value.includes("Niños")
    ) {
      listab = list;
    }
  
    return Array.from(new Set(listab));
  }
//DA EL FORMATO AL NOMBRE DE LA PERSONA/ (ESTADO:OKEY)
export function formattedName(item) {
    const formattedFirstName = item.nombre
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    const formattedLastName = item.apellido
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    return formattedFirstName + " " + formattedLastName;
  }





  ///AUXS

  function calculateAge(f) {
    // Calcular la edad a partir de la fecha de nacimiento
    const fechaNacimiento = new Date(f);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    return edad;
  }
  