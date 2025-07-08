import { Router } from "express";
import {
  obtenerEstadisticasAdmin,
  obtenerUltimasRespuestas,
  obtenerUsuariosRegistrados,
} from "../controllers/admin.controller.js";
import {
  verificarToken,
  esAdmin,
} from "../middlewares/autenticacion.middleware.js";

const router = Router();

router.get("/estadisticas", verificarToken, esAdmin, obtenerEstadisticasAdmin);

//Últimas 20 respuestas
router.get(
  "/respuestas/ultimas",
  verificarToken,
  esAdmin,
  obtenerUltimasRespuestas
);

//Todos los usuarios
router.get("/usuarios", verificarToken, esAdmin, obtenerUsuariosRegistrados);

export default router;
