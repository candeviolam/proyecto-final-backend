import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose"; //importo mongoose para incluir la conexión de MongoDB
/* import encuestaRouter from "../routes/encuesta.routes.js"; */
import adminRouter from "../routes/admin.routes.js";

configDotenv(); //para cargar las variables de entorno del archivo .env

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Conexión a MongoDB con mongoose
    this.conectarDB(); //llamo a la función para conectar la base de datos

    this.middlewares();
    this.routes(); //llamo al método para que mi aplicación disponga de esas rutas (lo mismo con los middlewares)
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
    /* this.app.use("/api/encuesta", encuestaRouter); //con ctrl + espacio para que me diga de donde importarla y me la importe arriba */
    this.app.use("/api/admin", adminRouter);
  }
}

export default Server;
