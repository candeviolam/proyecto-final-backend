import mongoose from "mongoose";
import dotenv from "dotenv";
import Encuesta from "../models/encuesta.model.js";

dotenv.config();

const encuestas = [
  // CULTURA
  // Libros
  {
    nombre: "Encuesta sobre hábitos de lectura",
    categoria: "Cultura",
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
    categoria: "Cultura",
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
        pregunta:
          "¿Qué tan dispuesto/a estás a explorar nuevos géneros? (0-10)",
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
    categoria: "Cultura",
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
    categoria: "Cultura",
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
          "¿Qué tan satisfecho/a estás con los eventos musicales de tu ciudad? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te gustaría asistir a más conciertos?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué artista te gustaría ver en vivo?" },
    ],
  },

  // Cine, series y películas
  {
    nombre: "Encuesta sobre series y películas",
    categoria: "Cultura",
    preguntas: [
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué tipo de contenido mirás con más frecuencia?",
        opciones: [
          "Series",
          "Películas",
          "Documentales",
          "Reality shows",
          "Otro",
        ],
      },
      {
        tipo: "texto",
        pregunta: "¿Qué plataforma usás más para mirar contenido?",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuántas horas por semana mirás series o películas?",
        opciones: ["Menos de 2 horas", "De 2 a 5 horas", "Más de 5 horas"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Preferís ver contenido solo/a o acompañado/a?",
        opciones: ["Solo/a", "Acompañado/a"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué tipo de contenidos te gustan más?",
        opciones: [
          "Drama",
          "Comedia",
          "Terror",
          "Ciencia ficción",
          "Romance",
          "Otro",
        ],
      },
      { tipo: "texto", pregunta: "¿Qué título recomendarías últimamente?" },
    ],
  },

  //ESTILO DE VIDA
  {
    nombre: "Encuesta sobre intereses y pasatiempos",
    categoria: "Estilo de vida",
    preguntas: [
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué actividades hacés en tu tiempo libre?",
        opciones: [
          "Leer",
          "Hacer deporte",
          "Ver series o películas",
          "Escuchar música",
          "Jugar videojuegos",
          "Salir con amigos",
          "Otro",
        ],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuántas horas por semana dedicás a tus hobbies?",
        opciones: ["Menos de 5 horas", "De 5 a 7 horas", "Más de 7 horas"],
      },
      {
        tipo: "escala",
        pregunta: "¿Qué tan importantes son tus pasatiempos en tu vida? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Preferís actividades al aire libre o en casa?",
        opciones: ["Al aire libre", "En casa"],
      },
      {
        tipo: "texto",
        pregunta: "¿Qué actividad te gustaría empezar a practicar?",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Solés compartir tus hobbies con otras personas?",
        opciones: ["Sí", "No"],
      },
    ],
  },
  {
    nombre: "Encuesta sobre bienestar personal",
    categoria: "Estilo de vida",
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
        pregunta: "¿Qué tan satisfecho/a estás con tu bienestar actual? (0-10)",
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
    nombre: "Encuesta sobre viajes y turismo",
    categoria: "Estilo de vida",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuántos viajes realizaste en el último año?",
        opciones: ["Ninguno", "1 o 2", "3 o más"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Preferís viajar solo/a o acompañado/a?",
        opciones: ["Solo/a", "Acompañado/a"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Qué medio de transporte usás más para viajar?",
        opciones: ["Avión", "Auto", "Tren", "Ómnibus", "Otro"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué tipo de destinos preferís?",
        opciones: ["Playa", "Montaña", "Ciudad", "Rural", "Otro"],
      },
      {
        tipo: "escala",
        pregunta: "¿Qué tan importante es viajar en tu vida? (0-10)",
      },
      {
        tipo: "texto",
        pregunta: "¿Qué destino te gustaría conocer próximamente?",
      },
    ],
  },

  //TECNOLOGÍA
  {
    nombre: "Encuesta sobre telefonía celular y servicios",
    categoria: "Tecnología",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuál es tu compañía de telefonía móvil actual?",
        opciones: ["Claro", "Movistar", "Personal", "Tuenti", "Otra"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Qué tipo de plan tenés contratado?",
        opciones: ["Plan prepago", "Abono mensual", "Plan empresa", "No sé"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué servicios adinicionales usás con tu línea móvil?",
        opciones: [
          "Internet",
          "Llamadas ilimitadas",
          "Mensajes de texto ilimitados",
          "Roaming",
          "Otro",
        ],
      },
      {
        tipo: "escala",
        pregunta:
          "¿Qué tan satisfecho/a estás con la velocidad de tu conexión a internet móvil? (0-10)",
      },
      {
        tipo: "opcionMultiple",
        pregunta:
          "¿Cuáles son los principales motivos por los que cambiarías de compañía?",
        opciones: [
          "Mala atención al cliente",
          "Precios altos",
          "Cobertura insuficiente",
          "Baja velocidad de internet",
          "Fatla de promociones",
          "Otro",
        ],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Con qué frecuencia tenés problemas de señal?",
        opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
      },
      {
        tipo: "texto",
        pregunta:
          "¿Qué características considerás más importantes en un servicio de telefonía móvil?",
      },
      {
        tipo: "escala",
        pregunta:
          "¿Qué tan probable es que recomendés tu compañía a otras personas? (0-10)",
      },
    ],
  },
  {
    nombre: "Encuesta sobre uso de tecnología",
    categoria: "Tecnología",
    preguntas: [
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué dispositivos usás con más frecuencia?",
        opciones: ["Celular", "Computadora", "Tablet", "Smart TV", "Otro"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuántas horas al día estás conectado/a a Internet?",
        opciones: ["Menos de 2 horas", "De 2 a 5 horas", "Más de 5 horas"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te considerás una persona actualizada tecnológicamente?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "¿Qué aplicaciones usás más?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Te gustaría aprender más sobre tecnología?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué aspecto de la tecnología te interesa más?",
        opciones: [
          "Innovación",
          "Seguridad",
          "Productividad",
          "Entretenimiento",
          "Otro",
        ],
      },
    ],
  },

  //MEDIO AMBIENTE
  {
    nombre: "Encuesta sobre el cuidado del medio ambiente",
    categoria: "Medio ambiente",
    preguntas: [
      {
        tipo: "escala",
        pregunta:
          "¿Qué importancia le das al cuidado del medio ambiente? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Separás residuos en tu casa?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Reducís el uso de plásticos?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué acciones hacés para cuidar el ambiente?",
        opciones: [
          "Reciclar",
          "Reutilizar objetos",
          "Usar menos transporte que contamine",
          "Ahorrar energía",
          "Otro",
        ],
      },
      {
        tipo: "opcionUnica",
        pregunta:
          "¿Te gustaría recibir información sobre prácticas sustentables?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "texto",
        pregunta: "¿Qué medida creés más urgente para proteger el planeta?",
      },
    ],
  },

  //EDUCACIÓN
  {
    nombre: "Encuesta sobre la vida universitaria",
    categoria: "Educación",
    preguntas: [
      { tipo: "texto", pregunta: "¿Qué edad tenés?" },
      {
        tipo: "texto",
        pregunta: "¿En qué año comenzaste a estudiar tu carrera?",
      },
      { tipo: "texto", pregunta: "¿Qué carrera estás cursando?" },
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuántas materias aprobaste hasta el momento?",
        opciones: ["Menos de 5", "Entre 5 y 10", "Más de 10"],
      },
      {
        tipo: "texto",
        pregunta: "¿Cuántas materias estás cursando actualmente?",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuántas horas por semana cursás?",
        opciones: ["De 2 a 4", "De 4 a 8", "Más de 8"],
      },
      {
        tipo: "opcionUnica",
        pregunta:
          "¿Cuántas horas por semana dedicás al estudio fuera de clase?",
        opciones: ["Entre 10 y 15", "Entre 15 y 20", "Más de 20"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Trabajás actualmente?",
        opciones: ["Sí", "No"],
      },
      { tipo: "texto", pregunta: "Si trabajás, ¿cuántas horas por semana?" },
    ],
  },

  //DEPORTE
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
        pregunta: "¿Preferís entrenar solo/a o en grupo?",
        opciones: ["Solo/a", "Grupo"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué motivaciones tenés para hacer ejercicio?",
        opciones: ["Salud", "Apariencia", "Diversión", "Rendimiento"],
      },
      {
        tipo: "texto",
        pregunta: "¿Cuántas horas dedicás semanalmente al deporte?",
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

  //MASCOTAS
  {
    nombre: "Encuesta sobre el cuidado de mascotas",
    categoria: "Mascotas",
    preguntas: [
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué tipo de mascota tenés actualmente?",
        opciones: [
          "Perro",
          "Gato",
          "Pájaro",
          "Pez",
          "Reptil",
          "Roedor",
          "Otro",
        ],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Con qué frecuencia llevás a tu mascota al veterinario?",
        opciones: [
          "Una vez al mes",
          "Cada 3-6 meses",
          "Una vez al año",
          "Solo si está enferma",
          "Nunca",
        ],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué cuidados le propocionás regularmente a tu mascota?",
        opciones: ["Paseos", "Peluquería", "Juegos", "Baños"],
      },
      {
        tipo: "escala",
        pregunta:
          "¿Qué tan importante considerás el cuidado dental de tu mascota? (0-10)",
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Qué tipo de alimento le das a tu mascota habitualmente?",
        opciones: ["Balanceado", "Comida casera", "Mixto", "Otro"],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Cuánto tiempo al día dedicás a estar con tu mascota?",
        opciones: [
          "Menos de 30 minutos",
          "Entre 30 minutos y 1 hora",
          "Entre 1 y 2 horas",
          "Más de 2 horas",
        ],
      },
      {
        tipo: "texto",
        pregunta:
          "¿Qué dificultades has encontrado en el cuidado de tu mascota?",
      },
    ],
  },
  {
    nombre: "Elección de mascotas",
    categoria: "Mascotas",
    preguntas: [
      {
        tipo: "opcionUnica",
        pregunta: "¿Tenés mascota actualmente?",
        opciones: ["Sí", "No"],
      },
      {
        tipo: "opcionMultiple",
        pregunta: "¿Qué tipo de mascota tenés o has tenido?",
        opciones: [
          "Perro",
          "Gato",
          "Pájaro",
          "Pez",
          "Conejo",
          "Roedor",
          "Reptil",
          "Otro",
        ],
      },
      {
        tipo: "opcionUnica",
        pregunta: "¿Qué animal considerás la mejor compañía?",
        opciones: [
          "Perro",
          "Gato",
          "Pájaro",
          "Roedor",
          "Reptil",
          "Ninguno",
          "Otro",
        ],
      },
      { tipo: "texto", pregunta: "¿Cuál es tu mascota favorita?" },
      {
        tipo: "opcionMultiple",
        pregunta:
          "¿Qué tipo de animal te gustaría tener como mascota en el futuro?",
        opciones: [
          "Perro",
          "Gato",
          "Pájaro",
          "Pez",
          "Conejo",
          "Roedor",
          "Reptil",
          "Ninguno",
          "Otro",
        ],
      },
      {
        tipo: "texto",
        pregunta: "¿Qué animal nunca elegirías como mascota?",
      },
      {
        tipo: "escala",
        pregunta:
          "¿Qué tan importante considerás que es adoptar en lugar de comprar una mascota? (0-10)",
      },
      {
        tipo: "escala",
        pregunta:
          "¿Qué tan informado/a te sentís sobre el cuidado responsable de las mascotas? (0-10)",
      },
    ],
  },

  //ALIMENTACIÓN
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
        pregunta: "¿Preferís cocinar solo/a o acompañado/a?",
        opciones: ["Solo/a", "Acompañado/a"],
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
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    for (const enc of encuestas) {
      const nueva = new Encuesta({
        nombre: enc.nombre,
        categoria: enc.categoria,
        descripcion: enc.descripcion || "",
        preguntas: enc.preguntas,
        estado: true,
      });
      await nueva.save();
    }
    console.log("Encuestas cargadas correctamente.");
    process.exit();
  } catch (error) {
    console.error("Error al cargar encuestas:", error);
    process.exit(1);
  }
})();
