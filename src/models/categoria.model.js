import mongoose from "mongoose";

//Creación esquema de categoría
const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true, //por defecto está activa
  },
});

//Crear el modelo de categoría con el esquema definido
const Categoria = mongoose.model("Categoria", CategoriaSchema);

export default Categoria;
