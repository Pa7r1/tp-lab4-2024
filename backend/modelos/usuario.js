import { db } from "./mysql.js";
import bcrypt from "bcrypt";

const Usuario = {
  contarAdmins: async () => {
    const sql = `SELECT COUNT(*) AS count FROM usuarios WHERE rol = 'administrador'`;
    const [result] = await db.execute(sql);
    return result[0].count;
  },

  crearAdmin: async () => {
    const username = process.env.USERNAME_ADMIN;
    const password = process.env.PASSWORD_ADMIN;
    const passwordHashed = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO usuarios (username, password, rol) VALUES (?, ?, 'administrador')`;
    await db.execute(sql, [username, passwordHashed]);
    console.log("admin creado");
  },
};

export default Usuario;
