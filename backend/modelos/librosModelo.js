import { db } from "./mysql.js";

const all = async () => {
  const sql = `SELECT * FROM libros`;
  const [libros] = await db.execute(sql);
  return libros;
};

const bookModel = {
  all,
};

export default bookModel;
