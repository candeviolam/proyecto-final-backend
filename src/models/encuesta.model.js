import mongoose from "mongoose";

const EncuestaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  preguntas: [
    {
      tipo: String, // 'texto', 'opcionUnica', 'opcionMultiple', 'escala'
      pregunta: String,
      opciones: [String],
    },
  ],
  respuestas: [
    {
      usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        default: null,
      },
      respuestas: [
        {
          pregunta: { type: String, required: true },
          respuesta: { type: mongoose.Schema.Types.Mixed },
        },
      ],
    },
  ],
  categoria: {
    type: String,
    required: true,
  },
});

const Encuesta = mongoose.model("Encuesta", EncuestaSchema);

export default Encuesta;
