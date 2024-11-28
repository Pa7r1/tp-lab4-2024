import bookModel from "../modelos/librosModelo.js";
import { validarJwt, validarRol } from "../middleware/authMiddleware.js";

const todos = async (req, res) => {
  const libros = await bookModel.all();
  res.send({ LIBROS: libros[0] });
};

const todosBorrados = async (req, res) => {
  const libros = await bookModel.allDelete();
  res.send({ LIBROS: libros[0] });
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
    res
      .status(500)
      .send({ mensaje: "error al crear libro", error: error.message });
  }
};

const editLibro = async (req, res) => {
  const id = req.params.id;
  const {
    titulo,
    genero_nombre,
    autor_nombre,
    editorial_nombre,
    año,
    precio_venta,
    precio_alquiler,
  } = req.body;

  const nuevoLibro = await bookModel.editarLibro(
    id,
    titulo || null,
    genero_nombre || null,
    autor_nombre || null,
    editorial_nombre || null,
    año || null,
    precio_venta || null,
    precio_alquiler || null
  );
  res.status(200).send({ libro_editado: nuevoLibro[0] });
};

const deshabilitarLibro = async (req, res) => {
  const id = req.params.id;
  const libroDeshabilitado = await bookModel.eliminarLibro(id);
  res.status(200).send({ libro_eliminado: libroDeshabilitado[0] });
};

const habilitarLibro = async (req, res) => {
  const id = req.params.id;
  const libroDeNuevo = await bookModel.habilitarLibro(id);
  res.status(200).send({ libro: libroDeNuevo[0] });
};

const buscarLibro = async (req, res) => {
  let titulo = req.query.titulo || null;
  let autor_nombre = req.query.autor_nombre || null;
  let isbn = req.query.isbn || null;
  const offset = 0;
  const limit = 10;

  titulo = titulo?.trim() || null;
  autor_nombre = autor_nombre?.trim() || null;
  isbn = isbn?.trim() || null;

  const libros = await bookModel.busquedaAvanzada(
    titulo,
    autor_nombre,
    isbn,
    offset,
    limit
  );
  res.status(200).send({ libros_buscados: libros[0] });
};

export default {
  name: "libros",
  librosActivos: todos,
  librosInactivos: [validarJwt, validarRol("administrador"), todosBorrados],
  update: [validarJwt, validarRol("administrador"), editLibro],
  create: [validarJwt, validarRol("administrador"), nuevoLibro],
  delete: [validarJwt, validarRol("administrador"), deshabilitarLibro],
  habilitarLibroN: [validarJwt, validarRol("administrador"), habilitarLibro],
  search: buscarLibro,
};
