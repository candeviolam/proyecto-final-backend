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

//Ruta para crear una nueva categoría (protegida)
router.post(
  "/crear",
  verificarToken, //Verificar si el usuario esta autenticado
  esAdmin, //Verificar si el usuario es admin
  [
    //Validación de datos
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  ],
  crearCategoria
);

//Ruta para obtener todas las categorías
router.get("/obtener", obtenerCategorias);

//Ruta para modificar una categoría por ID (protegida)
router.put(
  "/modificar/:id",
  verificarToken,
  esAdmin,
  [
    //Validación de datos - opcional porque el campo puede ser omitido, pero si está presente, requerirá que no esté vacío y será obligatorio
    body("nombre")
      .optional()
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
  ],
  modificarCategoria
);

//Ruta para eliminar una categoría por ID (protegida)
router.delete("/eliminar/:id", verificarToken, esAdmin, eliminarCategoria);

//Ruta para cambiar el estado de una categoría (activar/desactivar)
router.put("/estado/:id", verificarToken, esAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);
    if (!categoria)
      return res.status(404).json({ message: "Categoría no encontrada" });

    categoria.estado = !categoria.estado; //Alternar estado
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
