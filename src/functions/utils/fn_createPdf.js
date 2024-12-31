import Event from "../event/event.js";
import puppeteer from "puppeteer-core";
// import puppeteer from "puppeteer";

const FnCreateDocument = async (ContentMap) => {
  try {
    // Configurar Puppeteer con opciones específicas para contenedores
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--no-zygote",
        "--single-process",
        "--headless=new", // Mejor manejo de procesos en versiones recientes
      ],
      executablePath: process.env.CHROMIUM_PATH || "/usr/bin/google-chrome-stable", // Ruta al ejecutable
      headless: true,
    });

    const page = await browser.newPage();

    // Configurar el contenido HTML para renderizar en la página
    await page.setContent(ContentMap, {
      waitUntil: "networkidle0", // Asegurar que todo el contenido se cargue
    });

    // Generar el PDF y obtenerlo como un buffer
    const pdfBuffer = await page.pdf({
      format: "A4", // Cambiar a A4 si es más estándar para tu caso
      printBackground: true,
      margin: {
        top: "10mm",
        bottom: "10mm",
        left: "10mm",
        right: "10mm",
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
    console.error("Error al generar el PDF:", error);
    let errorLOG = error;
    let errogeneral = {
      Event: Event.ERRORCREATEPDF,
      ErrorLOG: errorLOG,
    };
    return errogeneral;
  }
};

const Document365 = async (json) => {
  try {
    const respuesta = await FnCreateDocument(json);
    return respuesta;
  } catch (error) {
    console.error("Error en Document365:", error);
    return {
      Event: Event.ERRORCREATEPDF,
      ErrorLOG: error,
    };
  }
};

export default Document365;
