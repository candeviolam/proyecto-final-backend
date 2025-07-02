import mongoose from "mongoose";
import dotenv from "dotenv";
import Categoria from "../models/categoria.model.js";

dotenv.config();

// Listado de categorías para cargar
const categorias = [
  { nombre: "Cultura", estado: true },
  { nombre: "Estilo de vida", estado: true },
  { nombre: "Deporte", estado: true },
  { nombre: "Alimentación", estado: true },
  { nombre: "Mascotas", estado: true },
  { nombre: "Tecnología", estado: true },
  { nombre: "Educación", estado: true },
  { nombre: "Medio ambiente", estado: true },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    // Insertar categorías
    for (const cat of categorias) {
      const nueva = new Categoria({
        nombre: cat.nombre,
        estado: cat.estado,
      });
      await nueva.save();
      console.log(`Categoría creada: ${cat.nombre}`);
    }

    console.log("Todas las categorías fueron cargadas correctamente.");
    process.exit();
  } catch (error) {
    console.error("Error al cargar categorías:", error);
    process.exit(1);
  }
})();
