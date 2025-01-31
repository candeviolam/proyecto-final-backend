import bcrypt from "bcrypt"; //importo bcrypt para encriptar la contraseña del super admin
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; //importo mongoose para incluir la conexión de MongoDB
import adminRouter from "../routes/admin.routes.js";
import encuestaRouter from "../routes/encuesta.routes.js";
import categoriaRouter from "../routes/categoria.routes.js";
import Usuario from "../models/usuario.model.js";

dotenv.config(); //para cargar las variables de entorno del archivo .env

//Super Admin predefinido
const crearSuperAdmin = async () => {
  const adminExistente = await Usuario.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (!adminExistente) {
    const admin = new Usuario({
      nombre: "Super Admin",
      email: process.env.ADMIN_EMAIL,
      contraseña: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
      rol: "admin",
    });

    await admin.save();
    console.log("Super Admin creado");
  }
};
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Conexión a MongoDB con mongoose
    this.conectarDB(); //llamo a la función para conectar la base de datos
    this.middlewares();
    this.routes(); //llamo al método para que mi aplicación disponga de esas rutas (lo mismo con los middlewares)
    this.iniciarAdmin();
  }

  async iniciarAdmin() {
    await crearSuperAdmin();
  }

  conectarDB() {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Conexión exitosa a MongoDB"))
      .catch((error) => console.error("Error al conectar a MongoDB", error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/admin", adminRouter); //con ctrl + espacio para que me diga de donde importarla y me la importe arriba
    this.app.use("/api/encuesta", encuestaRouter);
    this.app.use("/api/categoria", categoriaRouter);
  }
}

export default Server;
