import bookModel from "../modelos/librosModelo.js";

const todos = async (req, res) => {
  const libros = await bookModel.all();
  res.send({ libros });
};

const nuevoLibro = async (req, res) => {
  try {
    const {
      titulo,
      genero_nombre,
      autor_nombre,
      editorial_nombre,
      año,
      stock_inicial,
      precio_venta,
      precio_alquiler,
    } = req.body;

    const nuevoLibro = await bookModel.agregarLibroNuevo(
      titulo,
      genero_nombre,
      autor_nombre,
      editorial_nombre,
      año,
      stock_inicial,
      precio_venta,
      precio_alquiler
    );
    res.status(201).send({ libro_nuevo: nuevoLibro[0] });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ mensaje: "error al crear libro", error: error.message });
  }
};

export const bookControl = {
  todos,
  nuevoLibro,
};
