import mongoose from "mongoose";

const respuestaSchema = new mongoose.Schema(
  {
    encuestaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Encuesta",
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    respuestas: [
      {
        pregunta: { type: String, required: true },
        respuesta: { type: mongoose.Schema.Types.Mixed, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Respuesta", respuestaSchema);
