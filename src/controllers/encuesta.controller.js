import nodemailer from "nodemailer";
import Encuesta from "../models/encuesta.model.js";

//Función para enviar correos electrónicos
const enviarCorreo = (email, asunto, contenido) => {
  const envioDeCorreo = nodemailer.createTransport({
    service: "gmail",
    auth: {
      usuario: process.env.EMAIL_USER,
      contraseña: process.env.EMAIL_PASS,
    },
  });

  const opcionesCorreo = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: asunto,
    text: contenido,
  };

  envioDeCorreo.sendMail(opcionesCorreo, (error, info) => {
    if (error) console.error("Error al enviar correo", error);
    else console.log("Correo enviado:" + info.response);
  });
};

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

//Obtener una encuesta por ID
const obtenerEncuestaPorId = async (req, res) => {
  try {
    const encuesta = await Encuesta.findById(req.params.id);

    if (!encuesta)
      return res.status(404).json({ message: "Encuesta no encontrada" });

    res.json(encuesta);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la encuesta" });
  }
};

//Obtener encuestas por categoría
const obtenerEncuestasPorCategoria = async (req, res) => {
  try {
    const encuestas = await Encuesta.find({ categoria: req.params.nombre });
    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ message: "Error al filtrar encuestas" });
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

//Responder encuestas de manera anónima o con email
const responderEncuesta = async (req, res) => {
  try {
    const { email, respuestas } = req.body;
    const encuesta = await Encuesta.findById(req.params.id);

    if (!encuesta)
      return res.status(404).json({ message: "Encuesta no encontrada" });

    encuesta.respuestas.push({ email, respuestas });
    await encuesta.save();

    //Llamar a la función para enviar el email con las repsuestas
    enviarCorreo(
      email, //Dirección de correo del usuario
      `Respuestas enviadas para la encuesta: ${encuesta.nombre}`, //Asunto del correo
      `Tus respuestas: ${JSON.stringify(respuestas)}` //Contenido del correo
    );

    res.json({ message: "Respuesta registrada y correo enviado" });
  } catch (error) {
    res.status(500).json({ message: "Error al responder encuesta" });
  }
};

export {
  crearEncuesta,
  obtenerEncuestas,
  obtenerEncuestaPorId,
  obtenerEncuestasPorCategoria,
  modificarEncuesta,
  eliminarEncuesta,
  responderEncuesta,
};
