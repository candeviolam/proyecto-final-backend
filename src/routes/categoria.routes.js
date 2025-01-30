import { Router } from "express";
import { body } from "express-validator";
import {
  crearCategoria,
  obtenerCategorias,
  modificarCategoria,
  eliminarCategoria,
} from "../controllers/categoria.controller.js";

const router = Router();

//Ruta para crear una nueva categoría
router.post(
  "/crear",
  [
    //Validación de datos
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  ],
  crearCategoria
);

//Ruta para obtener todas las categorías
router.get("/obtener", obtenerCategorias);

//Ruta para modificar una categoría por ID
router.put(
  "/modificar/:id",
  [
    //Validación de datos - opcional porque el campo puede ser omitido, pero si está presente, requerirá que no esté vacío y será obligatorio
    body("nombre")
      .optional()
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
  ],
  modificarCategoria
);

//Ruta para eliminar una categoría por ID
router.delete("/eliminar/:id", eliminarCategoria);

export default router;
