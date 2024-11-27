import bookModel from "../modelos/librosModelo.js";

const todos = async (req, res) => {
  const libros = await bookModel.all();
  res.send({ libros });
};

const nuevoLibro = async (req, res) => {
  try {
    const {
      titulo,
      isbn,
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
      isbn,
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

const deshabilitarLibro = async (req, res) => {
  const libro_id = req.params.libro_id;
  const libroDeshabilitado = await bookModel.eliminarLibro(libro_id);
  res.status(200).send({ libro_eliminado: libroDeshabilitado[0] });
};

const habilitarLibro = async (req, res) => {
  const libro_id = req.params.libro_id;
  const libroDeNuevo = await bookModel.habilitarLibro(libro_id);
  res.status(200).send({ libro: libroDeNuevo[0] });
};

const buscarLibro = async (req, res) => {
  const i_titulo = req.query.titulo || null;
  const i_autor_nombre = req.query.autor_nombre || null;
  const i_isbn = req.query.isbn || null;

  const libros = await bookModel.busquedaAvanzada(
    i_titulo,
    i_autor_nombre,
    i_isbn
  );

  res.status(200).send({ libros_buscados: libros[0] });
};

export const bookControl = {
  todos,
  nuevoLibro,
  editLibro,
  deshabilitarLibro,
  habilitarLibro,
  buscarLibro,
};
