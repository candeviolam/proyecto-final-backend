import { Router } from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/auth.controller.js";
import {
  verificarToken,
  esAdmin,
} from "../middlewares/autenticacion.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Debe ingresar un email válido"),
    body("contraseña")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe contener al menos 6 caracteres"),
    body("nombre")
      .notEmpty()
      .withMessage("El nombre es obligatorio")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener al menos 3 caracteres"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Debe ingresar un email válido"),
    body("contraseña").notEmpty().withMessage("La contraseña es obligatoria"),
  ],
  login
);

router.get("/paneladmin", verificarToken, esAdmin, (req, res) => {
  res.json({ message: "Bienvenido al panel de administración" });
});

export default router;
