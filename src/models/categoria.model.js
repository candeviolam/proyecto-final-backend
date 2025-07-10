import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

const Categoria = mongoose.model("Categoria", CategoriaSchema);

export default Categoria;
