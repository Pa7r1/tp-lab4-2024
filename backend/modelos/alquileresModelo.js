import { db } from "./mysql.js";

const registrarAlquiler = async (
  empleado_id,
  cliente_id,
  libro_id,
  duracion_dias,
  cantidad
) => {
  const sql = `CALL registrarAlquiler(?,?,?,?,?)`;
  const [result] = await db.execute(sql, [
    empleado_id,
    cliente_id,
    libro_id,
    duracion_dias,
    cantidad,
  ]);
  return result;
};

const alquilerModel = {
  registrarAlquiler,
};

export default alquilerModel;
