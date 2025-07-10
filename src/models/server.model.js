import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "../routes/auth.routes.js";
import encuestaRouter from "../routes/encuesta.routes.js";
import categoriaRouter from "../routes/categoria.routes.js";
import adminRouter from "../routes/admin.routes.js";
import Usuario from "../models/usuario.model.js";
import {
  noEncontrado,
  manejoDeError,
} from "../middlewares/manejoDeError.middleware.js";

dotenv.config();

//Super Admin predefinido
const crearSuperAdmin = async () => {
  const adminExistente = await Usuario.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (!adminExistente) {
    const admin = new Usuario({
      nombre: "Super Admin",
      email: process.env.ADMIN_EMAIL,
      contraseñaHasheada: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
      rol: "admin",
    });

    await admin.save();
    console.log("Super Admin creado exitosamente");
  } else {
    const contraseñaAdminValida = await bcrypt.compare(
      process.env.ADMIN_PASSWORD,
      adminExistente.contraseñaHasheada
    );

    if (!contraseñaAdminValida) {
      const nuevaContraseñaHasheada = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
      );

      adminExistente.contraseñaHasheada = nuevaContraseñaHasheada;
      await adminExistente.save();
      console.log("Contraseña del Super Admin actualizada correctamente");
    } else {
      console.log("La contraseña del Super Admin es la misma");
    }
  }
};

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    //Conexión a MongoDB
    this.conectarDB();
    this.middlewares();
    this.routes();
    this.app.use(noEncontrado);
    this.app.use(manejoDeError);
  }

  async iniciarAdmin() {
    await crearSuperAdmin();
  }

  conectarDB() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Conexión exitosa a MongoDB");
        this.iniciarAdmin();
      })
      .catch((error) => console.error("Error al conectar a MongoDB", error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/encuesta", encuestaRouter);
    this.app.use("/api/categoria", categoriaRouter);
    this.app.use("/api/admin", adminRouter);
  }
}

export default Server;
