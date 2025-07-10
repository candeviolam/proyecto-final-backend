import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseñaHasheada: {
    type: String,
    required: true,
  },
  verificado: {
    type: Boolean,
    default: false,
  },
  rol: {
    type: String,
    default: "usuario",
  },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;
