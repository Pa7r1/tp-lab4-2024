import express from "express";
import cors from "cors";
import Router from "./routes/rutas.js";
import { authConfig } from "./middleware/passaportConfig.js";
import passport from "passport";
import { dbConnection } from "./modelos/mysql.js";
import ejecutarCrearAdmin from "./modelos/admin.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

authConfig();
app.use(passport.initialize());

app.use("/api/v1", Router);
app.use("/api/v1/login",Router);

const iniciar = async () => {
  await dbConnection();
  await ejecutarCrearAdmin();
  console.log("recursos necesarios ejecutados con exito");

  app.listen(PORT, () => {
    console.log(`servidor levantado en el puerto: ${PORT}`);
  });
};

iniciar();
