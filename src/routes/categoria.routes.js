import { Router } from "express";
import { body } from "express-validator";
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

export default router;