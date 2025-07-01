import mongoose from "mongoose";
import dotenv from "dotenv";
import Encuesta from "../models/encuesta.model.js";

dotenv.config();

const encuestas = [
  // Libros
  {
    nombre: "Encuesta sobre hábitos de lectura",
    categoria: "Libros",
    preguntas: [
      { tipo: "texto", pregunta: "¿Cuántos libros leés al mes?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te gusta leer?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué géneros literarios preferís?",
        opciones: [
          "Novela",
          "Ensayo",
          "Biografía",
          "Ciencia Ficción",
          "Poesía",
          "Drama",
          "Otro",
        ],
      },
      {
        tipo: "escala",
        pregunta: "¿Qué tan importante es la lectura en tu vida? (0-10)",
      },
      { tipo: "texto", pregunta: "¿Cuál fue el último libro que leíste?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Leés más en formato físico o digital?",
        opciones: ["Físico", "Digital"],
      },
    ],
  },
  {
    nombre: "Encuesta sobre géneros literarios favoritos",
    categoria: "Libros",
    preguntas: [
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué géneros solés leer?",
        opciones: [
          "Fantasía",
          "Romance",
          "Historia",
          "Policial",
          "Misterio",
          "Autoayuda",
          "Otro",
        ],
      },
      { tipo: "texto", pregunta: "¿Por qué preferís esos géneros?" },
      {
        tipo: "escala",
        pregunta: "¿Qué tan dispuesto estás a explorar nuevos géneros? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Leés autores contemporáneos?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué autor recomendarías?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Solés terminar los libros que empezás?",
        opciones: ["Siempre", "A veces", "Nunca"],
      },
    ],
  },

  // Música
  {
    nombre: "Encuesta sobre hábitos de escucha de música",
    categoria: "Música",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Escuchás música diariamente?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Para qué usas la música?",
        opciones: [
          "Relajarte",
          "Concentrarte",
          "Divertirte",
          "Socializar",
          "Otro",
        ],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué géneros musicales preferís?",
        opciones: ["Rock", "Pop", "Clásica", "Electrónica", "Jazz", "Otro"],
      },
      {
        tipo: "texto",
        pregunta: "¿En qué situaciones preferís escuchar música?",
      },
      {
        tipo: "escala",
        pregunta: "¿Qué tan importante es la música para vos? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Solés compartir música con otras personas?",
        opciones: ["Sí", "No"],
      },
    ],
  },
  {
    nombre: "Encuesta sobre conciertos y experiencias musicales",
    categoria: "Música",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Has asistido a conciertos en el último año?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "texto",
        pregunta: "¿Cuál fue el mejor concierto al que has ido?",
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué factores valorás en un concierto?",
        opciones: [
          "Sonido",
          "Iluminación",
          "Puntualidad",
          "Comodidad",
          "Artista",
        ],
      },
      {
        tipo: "escala",
        pregunta:
          "¿Qué tan satisfecho estás con los eventos musicales de tu ciudad? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te gustaría asistir a más conciertos?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué artista te gustaría ver en vivo?" },
    ],
  },

  // Deporte
  {
    nombre: "Encuesta sobre actividad física diaria",
    categoria: "Deporte",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Realizás actividad física regularmente?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "escala",
        pregunta: "¿Qué importancia le das al ejercicio diario? (0-10)",
      },
      { tipo: "texto", pregunta: "¿Qué deporte practicás más frecuentemente?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Preferís entrenar solo o en grupo?",
        opciones: ["Solo", "Grupo"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué motivaciones tenés para hacer ejercicio?",
        opciones: ["Salud", "Apariencia", "Diversión", "Rendimiento"],
      },
      {
        tipo: "texto",
        pregunta: "¿Cuántas horas dedicas semanalmente al deporte?",
      },
    ],
  },
  {
    nombre: "Encuesta sobre deportes al aire libre",
    categoria: "Deporte",
    preguntas: [
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué deportes al aire libre practicás?",
        opciones: [
          "Running",
          "Ciclismo",
          "Fútbol",
          "Senderismo",
          "Tenis",
          "Natación",
          "Otro",
          "No practico deportes al aire libre",
        ],
      },
      {
        tipo: "escala",
        pregunta:
          "¿Qué tan importante es el aire libre en tu entrenamiento? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Practicás deportes con regularidad?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué deporte te gustaría aprender?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Asistís a eventos deportivos?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué equipamiento considerás esencial?" },
    ],
  },

  // Mascotas
  {
    nombre: "Encuesta sobre cuidados de perros",
    categoria: "Mascotas",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Tenés perro?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué raza preferís?" },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué cuidados realizás habitualmente?",
        opciones: ["Paseos", "Veterinario", "Juegos", "Baños"],
      },
      {
        tipo: "escala",
        pregunta: "¿Qué tan importante es tu mascota en tu vida? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Permitís que duerma en tu cama?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué consejo darías a nuevos dueños?" },
    ],
  },
  {
    nombre: "Encuesta sobre convivencia con gatos",
    categoria: "Mascotas",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Tenés gato?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué alimento preferís darle?" },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué costumbres tiene tu gato?",
        opciones: ["Dormir mucho", "Jugar", "Cazar insectos", "Acompañar"],
      },
      { tipo: "escala", pregunta: "¿Qué tan independiente es tu gato? (0-10)" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Usa rascador?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "texto",
        pregunta: "¿Qué es lo que más te gusta de convivir con un gato?",
      },
    ],
  },

  // Alimentación
  {
    nombre: "Encuesta sobre hábitos de alimentación saludable",
    categoria: "Alimentación",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Consumís comida rápida?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "escala",
        pregunta: "¿Qué importancia le das a comer sano? (0-10)",
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué alimentos solés consumir?",
        opciones: ["Frutas", "Verduras", "Cereales", "Carnes", "Lácteos"],
      },
      { tipo: "texto", pregunta: "¿Cuál es tu comida favorita?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te gustaría mejorar tu alimentación?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué cambios harías en tu dieta diaria?" },
    ],
  },
  {
    nombre: "Encuesta sobre recetas caseras favoritas",
    categoria: "Alimentación",
    preguntas: [
      { tipo: "texto", pregunta: "¿Cuál es tu receta casera preferida?" },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué tipos de comida preparás más seguido?",
        opciones: ["Pastas", "Guisos", "Ensaladas", "Postres"],
      },
      { tipo: "escala", pregunta: "¿Qué tan a menudo cocinás en casa? (0-10)" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Preferís cocinar solo o acompañado?",
        opciones: ["Solo", "Acompañado"],
      },
      {
        tipo: "texto",
        pregunta: "¿Qué plato te gustaría aprender a preparar?",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Disfrutás cocinar?",
        opciones: ["Sí", "No"],
      },
    ],
  },

  // Hábitos y Bienestar Personal
  {
    nombre: "Encuesta sobre bienestar personal",
    categoria: "Hábitos y Bienestar Personal",
    preguntas: [
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué actividades realizás para relajarte?",
        opciones: [
          "Meditación",
          "Ejercicio",
          "Leer",
          "Ver series",
          "Salir a caminar",
          "Otros",
        ],
      },
      {
        tipo: "escala",
        pregunta: "¿Qué tan satisfecho estás con tu bienestar actual? (0-10)",
      },
      { tipo: "texto", pregunta: "¿Cuántas horas dormís al día?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Tenés alguna rutina diaria de autocuidado?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué cambiarías para sentirte mejor?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te sentís estresado frecuentemente?",
        opciones: ["Sí", "No"],
      },
    ],
  },
  {
    nombre: "Encuesta sobre hábitos digitales y uso de pantallas",
    categoria: "Hábitos y Bienestar Personal",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuántas horas al día usás pantallas?",
        opciones: ["Menos de 2hs", "2-5hs", "Más de 5hs"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Para qué usás principalmente las pantallas?",
        opciones: ["Trabajo", "Estudio", "Ocio", "Redes sociales", "Otro"],
      },
      { tipo: "texto", pregunta: "¿Qué dispositivo usás más?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te gustaría reducir tu uso de pantallas?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "texto",
        pregunta: "¿Qué actividad realizarías si no usaras pantallas?",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te sentís dependiente del celular?",
        opciones: ["Sí", "No"],
      },
    ],
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
        preguntas: enc.preguntas,
        estado: true,
      });
      await nueva.save();
      console.log(`Encuesta creada: ${enc.nombre}`);
    }

    console.log("Todas las encuestas fueron cargadas correctamente.");
    process.exit();
  } catch (error) {
    console.error("Error al cargar encuestas:", error);
    process.exit(1);
  }
})();
