import express from "express";
import cors from "cors";
import { authConfig } from "./middleware/passaportConfig.js";
import passport from "passport";
import { dbConnection } from "./modelos/mysql.js";
import ejecutarCrearAdmin from "./modelos/admin.js";
import ejecutarCliente from "./modelos/casual.js";
import { configureRoutes } from "./configureRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

authConfig();
app.use(passport.initialize());

await configureRoutes(app, "controladores");
console.log("rutas configurando");

const iniciar = async () => {
  await dbConnection();
  await ejecutarCrearAdmin();
  await ejecutarCliente();
  console.log("recursos necesarios ejecutados con exito");

  app.listen(PORT, () => {
    console.log(`servidor levantado en el puerto: ${PORT}`);
  });
};

iniciar();
