import { app } from "@azure/functions";
import Controller from "./controller/controller.js";
import EventStatus from "./event/event.js";

app.http("GeneratePdf", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const json = request.query.get("json") || (await request.json());
      const respuesta = await Controller(json);
      if (!respuesta) {
        return EventStatus.ERRORJSON;
      } else {
        return { jsonBody: respuesta };
      }
    } catch (error) {
      console.error("fnApitest error :", error);
      return { status: 500, jsonBody: { error: "Error interno del servidor" } };
    }
  },
});
export default app;
