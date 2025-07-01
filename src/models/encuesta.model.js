import mongoose from "mongoose";

//Creación del esquema de encuesta
const EncuestaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean, //estado de la encuesta, activa o inactiva
    default: true, //por defecto la encuesta está activa
  },
  preguntas: [
    {
      tipo: String, //'texto', 'opcionUnica', opcionMultiple', 'escala'
      pregunta: String,
      opciones: [String], //opciones disponibles si aplica (opción única/múltiple)
    },
  ],
  respuestas: [
    {
      usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, //para relacionar la respuesta con un usuario
      respuestas: [String], //respuestas dadas a cada preg
    },
  ],
  categoria: {
    type: String,
    required: true,
  },
});

//Crear el modelo de encuesta con el esquema definido
const Encuesta = mongoose.model("Encuesta", EncuestaSchema);

export default Encuesta;
