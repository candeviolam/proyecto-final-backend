import nodemailer from "nodemailer";
import Encuesta from "../models/encuesta.model.js";
import Respuesta from "../models/respuesta.model.js";
import moment from "moment";

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

    const nuevaRespuesta = new Respuesta({
      encuestaId: encuesta._id,
      email: email || null,
      respuestas,
    });
    await nuevaRespuesta.save();

    // Si el usuario ingresó un email, se envía el correo
    if (email) {
      const contenidoHTML = `
  <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; padding:20px; border-radius:8px;">
    <h2 style="color:#834e91;">¡Gracias por completar la encuesta!</h2>
    <p><strong>Encuesta:</strong> ${encuesta.nombre
      .replace(/^Encuesta (de|sobre)\s*/i, "")
      .trim()}
    </p>
    <hr>
    <h3 style="color:#555;">Tus respuestas:</h3>
    <ul style="list-style:none; padding:0;">
      ${respuestas
        .map(
          (r, index) =>
            `<li style="margin-bottom:10px;">
              <strong>Pregunta ${index + 1}:</strong><br>
              ${r.pregunta}<br>
              <strong>Respuesta:</strong><br>
              ${
                Array.isArray(r.respuesta)
                  ? r.respuesta.join(", ")
                  : r.respuesta
              }
            </li>`
        )
        .join("")}
    </ul>
    <hr>
    <p style="font-size:0.9em; color:#888;">Este correo es un resumen automático de tus respuestas.</p>
    <p style="font-size:0.9em; color:#888;">Encuestas Online</p>
  </div>
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
    console.error("Error al responder encuesta:", error);
    res
      .status(500)
      .json({ message: "Error al responder encuesta", error: error.message });
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

export const obtenerRespuestasPorDia = async (req, res) => {
  try {
    const dias = [];
    for (let i = 6; i >= 0; i--) {
      dias.push(moment().subtract(i, "days").startOf("day"));
    }

    const resultado = [];

    for (const dia of dias) {
      const siguienteDia = moment(dia).add(1, "day");

      const cantidad = await Respuesta.countDocuments({
        createdAt: { $gte: dia.toDate(), $lt: siguienteDia.toDate() },
      });

      resultado.push({
        dia: dia.format("dddd"), // Lunes, Martes, etc.
        cantidad,
      });
    }

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener las respuestas por día." });
  }
};

export const obtenerRespuestasPorEncuesta = async (req, res) => {
  try {
    const { id } = req.params;

    const respuestas = await Respuesta.find({ encuestaId: id });

    res.json(respuestas);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener las respuestas de la encuesta." });
  }
};
