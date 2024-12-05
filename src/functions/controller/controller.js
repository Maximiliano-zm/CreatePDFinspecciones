import fnActa1 from "../services/fn_acta1.js";
import fnCreatePdf from "../utils/fn_createPdf.js";
const Controller = async (json) => {
  let typeEvent = json.tipo_acta;
  let ContentMap;
  let CreatePdf;
  try {
    switch (typeEvent) {
      case 1:
        ContentMap = await fnActa1(json);
        CreatePdf = await fnCreatePdf(ContentMap);
        console.log(CreatePdf);
        return CreatePdf;
      // case "Acta2":
      // ContentMap = await fnActa2(json);
      // CreatePdf = await fnCreatePdf(ContentMap);
      // console.log(CreatePdf);
      // return CreatePdf;
    }
  } catch (error) {
    console.error(error);
  }
};
export default Controller;
