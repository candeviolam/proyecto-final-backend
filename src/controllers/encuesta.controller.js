import Encuesta from "../models/encuesta.model.js";

//Crear nueva encuesta
const crearEncuesta = async (req, res) => {
  const { nombre, preguntas, categoria } = req.body;
  try {
    const nuevaEncuesta = new Encuesta({
      nombre,
      preguntas,
      categoria,
      estado: true, //por defecto,  la encuesta se crea como activa
    });
    await nuevaEncuesta.save();
    res.json({
      message: "Encuesta creada correctamente",
      encuesta: nuevaEncuesta,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear encuesta", error: error.message });
  }
};

//Obtener todas las encuestas
const obtenerEncuestas = async (req, res) => {
  try {
    //Obtener todas las encuestas de la base de datos
    const encuestas = await Encuesta.find();
    res.json(encuestas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener encuestas", error: error.message });
  }
};

//Modificar una encuesta
const modificarEncuesta = async (req, res) => {
  const { id } = req.params; //obtener el ID de la encuesta desde los parámetros de la URL
  const { nombre, preguntas, categoria, estado } = req.body;
  try {
    const encuesta = await Encuesta.findByIdAndUpdate(
      id,
      { nombre, preguntas, categoria, estado }, //los campos que se van a actualizar
      { new: true } //nos devuelve la encuesta actualizada
    );
    //Si no se encuentra la encuesta con el ID proporcionado
    if (!encuesta) {
      return res.status(404).json({ message: "Encuesta no encontada" });
    }
    //Si la actualización fue exitosa, se envía la respuesta
    res.json({ message: "Encuesta modificada correctamente", encuesta });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al modificar encuesta", error: error.message });
  }
};

//Eliminar una encuesta
const eliminarEncuesta = async (req, res) => {
  const { id } = req.params;
  try {
    const encuesta = await Encuesta.findByIdAndDelete(id);
    if (!encuesta) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    res.json({ message: "Encuesta eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar encuesta", error: error.message });
  }
};

export { crearEncuesta, obtenerEncuestas, modificarEncuesta, eliminarEncuesta };
