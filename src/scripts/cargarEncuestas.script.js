import mongoose from "mongoose";
import dotenv from "dotenv";
import Encuesta from "../models/encuesta.model.js";

dotenv.config();

const encuestas = [
  {
    nombre: "Encuesta sobre hábitos de lectura",
    categoria: "Libros",
  },
  {
    nombre: "Encuesta sobre géneros literarios favoritos",
    categoria: "Libros",
  },
  {
    nombre: "Encuesta sobre hábitos de escucha de música",
    categoria: "Música",
  },
  {
    nombre: "Encuesta sobre conciertos y experiencias musicales",
    categoria: "Música",
  },
  {
    nombre: "Encuesta sobre actividad física diaria",
    categoria: "Deporte",
  },
  {
    nombre: "Encuesta sobre deportes al aire libre",
    categoria: "Deporte",
  },
  {
    nombre: "Encuesta sobre cuidados de perros",
    categoria: "Mascotas",
  },
  {
    nombre: "Encuesta sobre convivencia con gatos",
    categoria: "Mascotas",
  },
  {
    nombre: "Encuesta sobre cuidado capilar",
    categoria: "Cuidado Personal",
  },
  {
    nombre: "Encuesta sobre cuidado facial diario",
    categoria: "Cuidado Personal",
  },
  {
    nombre: "Encuesta sobre hábitos de alimentación saludable",
    categoria: "Alimentación",
  },
  {
    nombre: "Encuesta sobre recetas caseras favoritas",
    categoria: "Alimentación",
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    for (const enc of encuestas) {
      const nueva = new Encuesta({
        nombre: enc.nombre,
        categoria: enc.categoria,
        preguntas: [],
        estado: true,
      });
      await nueva.save();
      console.log(`Encuesta creada: ${enc.nombre}`);
    }

    console.log("Todas las encuestas fueron cargadas");
    process.exit();
  } catch (error) {
    console.error("Error al cargar encuestas:", error);
    process.exit(1);
  }
})();
