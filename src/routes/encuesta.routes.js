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
  obtenerRespuestasPorDia,
  obtenerRespuestasPorEncuesta,
} from "../controllers/encuesta.controller.js";
import {
  verificarToken,
  esAdmin,
} from "../middlewares/autenticacion.middleware.js";

const router = Router();

router.post(
  "/crear",
  verificarToken,
  esAdmin,
  [
    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener al menos 3 caracteres"),
    body("categoria").notEmpty().withMessage("La categoría es obligatoria"),
    body("preguntas")
      .isArray({ min: 1 })
      .withMessage("Debe agregar al menos una pregunta")
      .custom((preguntas) => {
        preguntas.forEach((p, i) => {
          if (!p.pregunta || p.pregunta.trim() === "") {
            throw new Error(`La pregunta #${i + 1} no puede estar vacía`);
          }
        });
        return true;
      }),
  ],

  crearEncuesta
);

router.get("/obtener", obtenerEncuestas);

router.get("/activas", obtenerEncuestasActivas);

router.get(
  "/respuestas-por-dia",
  verificarToken,
  esAdmin,
  obtenerRespuestasPorDia
);

router.get("/:id", obtenerEncuestaPorId);

router.get(
  "/:id/respuestas",
  verificarToken,
  esAdmin,
  obtenerRespuestasPorEncuesta
);

router.get("/categoria/:nombre", obtenerEncuestasPorCategoria);

router.put(
  "/modificar/:id",
  verificarToken,
  esAdmin,
  [
    body("nombre")
      .optional()
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener al menos 3 caracteres"),
    body("categoria")
      .optional()
      .notEmpty()
      .withMessage("La categoría es obligatoria"),
    body("descripcion")
      .optional()
      .isString()
      .isLength({ max: 500 })
      .withMessage("La descripción no puede superar 500 caracteres"),
    body("preguntas")
      .optional()
      .isArray({ min: 1 })
      .withMessage("Debe haber al menos una pregunta")
      .custom((preguntas) => {
        preguntas.forEach((p, i) => {
          if (!p.pregunta || p.pregunta.trim() === "") {
            throw new Error(`La pregunta #${i + 1} no puede estar vacía`);
          }
        });
        return true;
      }),
  ],
  modificarEncuesta
);

router.delete("/eliminar/:id", verificarToken, esAdmin, eliminarEncuesta);

router.post("/:id/responder", responderEncuesta);

router.put("/estado/:id", verificarToken, esAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const encuesta = await Encuesta.findById(id);
    if (!encuesta)
      return res.status(404).json({ message: "Encuesta no encontrada" });

    encuesta.estado = !encuesta.estado;
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
