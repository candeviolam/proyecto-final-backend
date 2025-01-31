import { Router } from "express";
import { body } from "express-validator";
import {
  crearEncuesta,
  obtenerEncuestas,
  modificarEncuesta,
  eliminarEncuesta,
  obtenerEncuestaPorId,
  obtenerEncuestasPorCategoria,
  responderEncuesta, 
} from "../controllers/encuesta.controller.js";
import { verificarToken } from "../middlewares/autenticacionMiddleware.js";

const router = Router();

//Ruta para crear una nueva encuesta
router.post(
  "/crear",
  [
    //Validación de datos
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("preguntas")
      .isArray()
      .withMessage("Las preguntas deben ser una array"),
    body("categoria").notEmpty().withMessage("La categoria es obligatoria"),
  ],
  crearEncuesta
);

//Ruta para obtener todas las encuestas
router.get("/obtener", obtenerEncuestas);

//Ruta para ortener una encuesta específica por ID
router.get("/:id", verificarToken, obtenerEncuestaPorId);

//Ruta para obtener encuestas por categoría
router.get("/categoria/:nombre", verificarToken, obtenerEncuestasPorCategoria);

//Ruta para modificar una encuesta por ID
//Validación de datos - opcional porque el campo puede ser omitido, pero si está presente, requerirá que no esté vacío y será obligatorio
router.put(
  "/modificar/:id",
  [
    body("nombre")
      .optional()
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
    body("preguntas")
      .optional()
      .isArray()
      .withMessage("Las preguntas deben ser un arreglo"),
    body("categoria")
      .optional()
      .notEmpty()
      .withMessage("La categoría es obligatorio"),
  ],
  modificarEncuesta
);

//Ruta para eliminar una encuesta por ID
router.delete("/eliminar/:id", eliminarEncuesta);

//Ruta para permitir responder encuestas de manera anónima o por email
router.post("/:id/responder", responderEncuesta); 

export default router;
