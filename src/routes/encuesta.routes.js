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

//Ruta para crear una nueva encuesta (protegida)
router.post(
  "/crear",
  verificarToken, //Verifica el token JWT
  esAdmin, //Verifica si el usuario es administrador
  //Validación de datos
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

//Ruta para obtener todas las encuestas
router.get("/obtener", obtenerEncuestas);

//Ruta para obtener solo encuestas activas
router.get("/activas", obtenerEncuestasActivas);

// Ruta para obtener las respuestas de todas las encuestas por día
router.get(
  "/respuestas-por-dia",
  verificarToken,
  esAdmin,
  obtenerRespuestasPorDia
);

//Ruta para ortener una encuesta específica por ID
router.get("/:id", obtenerEncuestaPorId);

// Ruta para obtener las respuestas de una encuesta específica
router.get(
  "/:id/respuestas",
  verificarToken,
  esAdmin,
  obtenerRespuestasPorEncuesta
);

//Ruta para obtener encuestas por categoría
router.get("/categoria/:nombre", obtenerEncuestasPorCategoria);

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
