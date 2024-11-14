import express from "express";
import cors from "cors";
import Router from "./routes/rutas.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", Router);

app.get("/", (req, res) => {
  res.send("todo ok desde api book-store");
});

app.listen(PORT, () => {
  console.log(`servidor levantado en el puerto: ${PORT}`);
});
