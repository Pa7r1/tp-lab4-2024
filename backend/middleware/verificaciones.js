// import { param, body, validationResult } from "express-validator";



// // Middleware para validar si el libro existe
// export const verificarLibroExistente = async (req, res, next) => {
//   const libro_id = req.params.libro_id;
//   const libro = await bookModel.buscarPorId(libro_id);

//   if (!libro) {
//     return res.status(404).send({ mensaje: "Libro no encontrado" });
//   }
//   next();
// };

// // Middleware para comprobar si el usuario ya existe
// export const verificarUsernameExistente = async (req, res, next) => {
//   const { username } = req.body;

//   try {
//     const usuarioExistente = await userModel.buscarUsuarioPorUsername(username);
//     if (usuarioExistente.length > 0) {
//       return res.status(400).send({ mensaje: "El nombre de usuario ya existe." });
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ mensaje: "Error al verificar el nombre de usuario.", error: error.message });
//   }
// };

// //middleware para Validar el rol del usuario (Autorización)
// export const validarRol = (rolRequerido) => {
//   return (req, res, next) => {
//     const { rol } = req.user;
//     if (rol !== rolRequerido) {
//       return res.status(403).send({ mensaje: "Acceso denegado." });
//     }
//     next();
//   };
// };

