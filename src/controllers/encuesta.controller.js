import nodemailer from "nodemailer";
import Encuesta from "../models/encuesta.model.js";

//Función para enviar correos electrónicos
const enviarCorreo = async (email, asunto, contenido) => {
  if (!email) return; //Si no hay email, no enviamos nada

  const envioDeCorreo = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const opcionesCorreo = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: asunto,
    html: contenido,
  };

  try {
    const info = await envioDeCorreo.sendMail(opcionesCorreo);
    console.log("Correo enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar correo", error);
  }
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

//Obtener solo encuestas activas
const obtenerEncuestasActivas = async (req, res) => {
  try {
    const encuestas = await Encuesta.find({ estado: true });
    res.json(encuestas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener encuestas activas", error });
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

    //Validación de respuestas
    if (!Array.isArray(respuestas) || respuestas.length === 0) {
      return res
        .status(400)
        .json({ message: "Las respuestas son obligatorias" });
    }

    const encuesta = await Encuesta.findById(req.params.id);

    if (!encuesta) {
      return res.status(404).json({ message: "Encuesta no encontrada" });
    }

    //Agregar "usuarioId" aunque sea null si no hay usuario, puesto que aparece en el EncuestaSchema
    encuesta.respuestas.push({
      usuarioId: null, //O null si es anónimo
      respuestas,
    });

    await encuesta.save(); //Se guarda la encuesta con las respuestas

    //Si el usuario ingresó un email, se envía el correo
    if (email) {
      const contenidoHTML = `
      <h2>Gracias por completar la encuesta: ${encuesta.nombre}</h2>
      <p>Tus respuestas:</p>
      <ul>
      ${respuestas
        .map(
          (r, index) =>
            `<li><strong>Pregunta ${index + 1}:</strong> ${
              r.pregunta
            } <br> <strong>Respuesta:</strong> ${r.respuesta}</li>`
        )
        .join("")}
      </ul>
      <p>Saludos,</p>
      <p>Encuestas Online</p>
      `;

      try {
        await enviarCorreo(
          email,
          `Respuestas de la encuesta: ${encuesta.nombre}`,
          contenidoHTML
        );
      } catch (error) {
        console.error("Error al enviar el correo:", error);
      }
    }

    res.json({
      message: email
        ? "Respuesta registrada y correo enviado"
        : "Respuesta registrada",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al responder encuesta" });
  }
};

export {
  crearEncuesta,
  obtenerEncuestas,
  obtenerEncuestasActivas,
  obtenerEncuestaPorId,
  obtenerEncuestasPorCategoria,
  modificarEncuesta,
  eliminarEncuesta,
  responderEncuesta,
};
