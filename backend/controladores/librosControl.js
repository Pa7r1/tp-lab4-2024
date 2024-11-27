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

const editLibro = async (req, res) => {
  const libro_id = req.params.libro_id;
  const {
    i_titulo,
    i_genero_nombre,
    i_autor_nombre,
    i_editorial_nombre,
    i_año,
    i_precio_venta,
    i_precio_alquiler,
  } = req.body;

  const nuevoLibro = await bookModel.editarLibro(
    libro_id,
    i_titulo || null,
    i_genero_nombre || null,
    i_autor_nombre || null,
    i_editorial_nombre || null,
    i_año || null,
    i_precio_venta || null,
    i_precio_alquiler || null
  );
  res.status(200).send({ libro_editado: nuevoLibro[0] });
};

export const bookControl = {
  todos,
  nuevoLibro,
  editLibro,
};
