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

router.get(
  "/respuestas/ultimas",
  verificarToken,
  esAdmin,
  obtenerUltimasRespuestas
);

router.get("/usuarios", verificarToken, esAdmin, obtenerUsuariosRegistrados);

export default router;
