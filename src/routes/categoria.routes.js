import { Router } from "express";
import { body } from "express-validator";
import Categoria from "../models/categoria.model.js";
import {
  crearCategoria,
  obtenerCategorias,
  modificarCategoria,
  eliminarCategoria,
} from "../controllers/categoria.controller.js";
import {
  verificarToken,
  esAdmin,
} from "../middlewares/autenticacion.middleware.js";

const router = Router();

router.post(
  "/crear",
  verificarToken,
  esAdmin,
  [body("nombre").notEmpty().withMessage("El nombre es obligatorio")],
  crearCategoria
);

router.get("/obtener", obtenerCategorias);

router.put(
  "/modificar/:id",
  verificarToken,
  esAdmin,
  [
    body("nombre")
      .optional()
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
  ],
  modificarCategoria
);

router.delete("/eliminar/:id", verificarToken, esAdmin, eliminarCategoria);

router.put("/estado/:id", verificarToken, esAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);
    if (!categoria)
      return res.status(404).json({ message: "Categoría no encontrada" });

    categoria.estado = !categoria.estado;
    await categoria.save();

    res.json({
      message: `Categoría ${categoria.estado ? "activada" : "desactivada"}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al cambiar el estado de la categoría", error });
  }
});

export default router;
