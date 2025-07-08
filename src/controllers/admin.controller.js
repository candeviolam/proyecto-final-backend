import Encuesta from "../models/encuesta.model.js";
import Categoria from "../models/categoria.model.js";
import Usuario from "../models/usuario.model.js";

export const obtenerEstadisticasAdmin = async (req, res) => {
  try {
    const [
      encuestasActivas,
      categoriasActivas,
      respuestasTotales,
      usuariosRegistrados,
    ] = await Promise.all([
      Encuesta.countDocuments({ estado: true }),
      Categoria.countDocuments({ estado: true }),
      Encuesta.aggregate([
        { $unwind: "$respuestas" },
        { $count: "totalRespuestas" },
      ]),
      Usuario.countDocuments(),
    ]);

    res.json({
      encuestasActivas,
      categoriasActivas,
      respuestasTotales: respuestasTotales[0]?.totalRespuestas || 0,
      usuariosRegistrados,
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    res.status(500).json({ message: "Error obteniendo estadísticas", error });
  }
};

export const obtenerUltimasRespuestas = async (req, res) => {
  try {
    const respuestas = await Encuesta.aggregate([
      { $unwind: "$respuestas" },
      {
        $project: {
          encuestaId: "$_id",
          encuestaNombre: "$nombre",
          categoria: "$categoria",
          respuesta: "$respuestas",
        },
      },
      { $sort: { "respuesta.fecha": -1 } },
      { $limit: 20 },
    ]);

    res.json(respuestas);
  } catch (error) {
    console.error("Error obteniendo últimas respuestas:", error);
    res.status(500).json({ message: "Error obteniendo respuestas", error });
  }
};

export const obtenerUsuariosRegistrados = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "nombre email rol createdAt").sort({
      createdAt: -1,
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ message: "Error obteniendo usuarios", error });
  }
};
