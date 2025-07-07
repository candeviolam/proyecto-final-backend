export const noEncontrado = (req, res, next) => {
  res.status(404).json({
    message: "La ruta solicitada no existe",
    status: 404,
  });
};

export const manejoDeError = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
    status: err.status || 500,
  });
};
