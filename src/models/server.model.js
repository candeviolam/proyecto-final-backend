import express from "express";
import { configDotenv } from "dotenv";
/* import encuestaRouter from "../routes/encuesta.routes.js"; */
import adminRouter from "../routes/admin.routes.js";

configDotenv();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes(); //llamo al método para que mi aplicación disponga de esas rutas (lo mismo con los middlewares)
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
