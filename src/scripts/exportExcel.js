import ExcelJS from "exceljs";
import swal from "sweetalert";
export async function exportDataToExcel(dataDb){
    const exportA = await swal({
      title: "¿ Estás seguro ?",
      text: "Esto exportara a excel la lista de todos los miembros de la congregacion",
      icon: "info",
  
      buttons: true,
      dangerMode: true,
    });
  
    if (!exportA) return;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Miembros");

    // Define las propiedades (columnas) que deseas incluir en la exportación
    const propertiesToInclude = [
      "tipoDocumento",
      "numeroDocumento",
      "nombre",
      "apellido",
      "rol",
      "fechaNacimiento",
      "celular",
      "direccion",
      "sexo",
      "estadoCivil",
      "esBautizado",
      "fechaBautismo",
      "nombrePastorBautismo",
      "referenciaPastoral",
    ];
  
    // Agrega un título a la tabla
    const titleCell = worksheet.getCell("A1");
    titleCell.font = { bold: true, size: 16 }; // Texto en negrita y tamaño
    titleCell.alignment = { horizontal: "center" }; // Alineación centrada
    // Configura los encabezados personalizados
    const customHeaders = [
      "Tipo de Documento",
      "Número de Documento",
      "Nombre",
      "Apellido",
      "Rol",
      "Fecha de Nacimiento",
      "Celular",
      "Dirección",
      "Sexo",
      "Estado Civil",
      "Es Bautizado",
      "Fecha de Bautismo",
      "Nombre del Pastor de Bautismo",
      "Referencia Pastoral",
    ];
    // Agrega las columnas personalizadas a la hoja de cálculo
    worksheet.columns = propertiesToInclude.map((prop, index) => ({
      header: customHeaders[index], // Nombre del encabezado personalizado
      key: prop, // Propiedad de los datos
      width: 20, // Ancho de la columna
    }));
  
    // Mapea los datos de prueba para incluir solo las propiedades deseadas
    const data = dataDb;
    const filteredData = data.map((item) => {
      const filteredItem = {};
      for (const prop of propertiesToInclude) {
        filteredItem[prop] = item[prop];
      }
      return filteredItem;
    });
    // Agrega los encabezados en la segunda fila con negrita y formato
    const headerRow = worksheet.addRow(customHeaders);
    headerRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "2291A3" }, // Fondo azul
      };
      cell.font = {
        bold: true, // Negrita
        color: { argb: "FFFFFF" }, // Letra blanca
      };
    });
  
    // Agrega los datos filtrados a la hoja de cálculo
    worksheet.addRows(filteredData);
    // Aplicar bordes a todas las celdas de la tabla
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
  
    worksheet.mergeCells("A1:N1"); // Fusiona las celdas para el título
    titleCell.value = "Membresía IPUC"; // Título
    // Crea el archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      try {
        if (buffer && buffer.length > 0) {
          // Descarga el archivo Excel en el navegador
          saveAs(new Blob([buffer]), "MembresiaIpuc.xlsx");
        } else {
          console.error("El archivo Excel está vacío.");
        }
      } catch (error) {
        console.error("Error al descargar el archivo Excel:", error);
      }
    });
  };