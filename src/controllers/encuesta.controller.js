//en 'controllers' se define la logica de la ruta

const saludo = (req, res) => {
  res.json({
    message: "Encuesta route",
  });
};

export { saludo };


