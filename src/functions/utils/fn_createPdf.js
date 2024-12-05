import Event from "../event/event.js";
import puppeteer from "puppeteer"; // Cambia a puppeteer-core para evitar conflictos

const FnCreateDocument = async (ContentMap) => {
  try {
    // Ruta al binario de Chromium instalado en el contenedor


    const browser = await puppeteer.launch({
      
    });

    const page = await browser.newPage();

    // Cargar el contenido HTML dinámico
    await page.setContent(ContentMap);

    // Generar el PDF y obtenerlo como un buffer
    const pdfBuffer = await page.pdf({
      format: "LETTER",
      printBackground: true,
      margin: {
        top: "10px",
        bottom: "10px",
        left: "10px",
        right: "10px",
      },
    });

    // Convertir el buffer del PDF a Base64
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");
    await browser.close();

    // Retornar el PDF en Base64
    return {
      pdfBase64,
    };
  } catch (error) {
    console.log(error);
    let errorLOG = error;
    let errogeneral = {
      Event: Event.ERRORCREATEPDF,
      ErrorLOG: errorLOG,
    };
    return errogeneral;
  }
};

const Document365 = async (json) => {
  const respuesta = await FnCreateDocument(json);
  return respuesta;
};

export default Document365;
