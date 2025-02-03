//Para definir los usuarios
import mongoose from "mongoose"; //para trabajar con la base de datos

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
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;
