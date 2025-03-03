import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/admin.controller.js";
import {
  verificarToken,
  esAdmin,
} from "../middlewares/autenticacion.middleware.js"; //importar el middleware

const router = Router();

//Ruta  para el registro con validaciones
router.post(
  "/register",
  [
    //Validación del email
    body("email").isEmail().withMessage("Debe ingresar un email válido"),

    //Validación de contraseña
    body("contraseña")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe contener al menos 6 caracteres"),

    //Validación del nombre
    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener al menos 3 caracteres"),
  ],
  register
);

//Ruta para el login con validaciones
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Debe ingresar un email válido"),
    body("contraseña").notEmpty().withMessage("La contraseña es obligatoria"),
  ],
  login
);

//Ruta protegida para acceder al panel de administración
router.get("/paneladmin", verificarToken, esAdmin, (req, res) => {
  res.json({ message: "Bienvenido al panel de administración" });
});

export default router;
