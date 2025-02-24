import { Router } from "express";
import { body } from "express-validator";
import Encuesta from "../models/encuesta.model.js";
import {
  crearEncuesta,
  obtenerEncuestas,
  obtenerEncuestasActivas,
  modificarEncuesta,
  eliminarEncuesta,
  obtenerEncuestaPorId,
  obtenerEncuestasPorCategoria,
  responderEncuesta,
} from "../controllers/encuesta.controller.js";
import {
  verificarToken,
  esAdmin,
} from "../middlewares/autenticacion.middleware.js";

const router = Router();

//Ruta para crear una nueva encuesta (protegida)
router.post(
  "/crear",
  verificarToken, //Verifica el token JWT
  esAdmin, //Verifica si el usuario es administrador
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

//Ruta para obtener solo encuestas activas
router.get("/activas", obtenerEncuestasActivas);

//Ruta para ortener una encuesta específica por ID
router.get("/:id", verificarToken, obtenerEncuestaPorId);

//Ruta para obtener encuestas por categoría
router.get("/categoria/:nombre", verificarToken, obtenerEncuestasPorCategoria);

//Ruta para modificar una encuesta por ID (protegida)
//Validación de datos - opcional porque el campo puede ser omitido, pero si está presente, requerirá que no esté vacío y será obligatorio
router.put(
  "/modificar/:id",
  verificarToken,
  esAdmin,
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

//Ruta para eliminar una encuesta por ID (protegida)
router.delete("/eliminar/:id", verificarToken, esAdmin, eliminarEncuesta);

//Ruta para permitir responder encuestas de manera anónima o por email
router.post("/:id/responder", responderEncuesta);

//Ruta para cambiar el estado de una encuesta (activar/desactivar)
router.put("/estado/:id", verificarToken, esAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const encuesta = await Encuesta.findById(id);
    if (!encuesta)
      return res.status(404).json({ message: "Encuesta no encontrada" });

    encuesta.estado = !encuesta.estado; //Alternar estado
    await encuesta.save();

    res.json({
      message: `Encuesta ${encuesta.estado ? "activada" : "desactivada"}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al cambiar el estado de la encuesta", error });
  }
});

export default router;
