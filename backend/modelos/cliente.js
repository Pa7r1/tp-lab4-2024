import { db } from "./mysql.js";

const clienteAutom = {
  contarClientes: async () => {
    const sql = `SELECT COUNT(*) AS count FROM clientes WHERE nombre = 'casual'`;
    const [result] = await db.execute(sql);
    return result[0].count;
  },

  crearClient: async () => {
    const nombre = "casual";
    const email = "casual";
    const telefono = "casual";
    const direccion = "casual";
    const sql = `INSERT INTO clientes (nombre,email,telefono,direccion) VALUES (?, ?,?,?)`;
    await db.execute(sql, [nombre, email, telefono, direccion]);
    console.log("cliente creado");
  },
};

export default clienteAutom;
