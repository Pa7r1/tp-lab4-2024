import { param, body, validationResult } from "express-validator";

export const validarId = param("id").isInt({ min: 1 });

// Middleware para verificar las validaciones
export const verificarValidaciones = (req, res, next) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }
  next();
};

export const validarUsuario = [
  body("username").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  }),
  body("rol").isAlpha().notEmpty().isLength({ max: 45 }),
];

export const validarConsulta = () => [
  query("edad_gt").isInt({ min: 0 }).optional(),
  query("edad_lt").isInt({ min: 0 }).optional(),
  query("altura_gt").isFloat({ min: 0 }).optional(),
  query("altura_lt").isFloat({ min: 0 }).optional(),
];

export const validarPersona = () => [
  body("nombre").isAlpha().notEmpty().isLength({ max: 50 }),
  body("apellido").isAlpha().notEmpty().isLength({ max: 50 }),
  body("edad").isInt({ min: 1 }),
  body("altura").isFloat({ min: 1 }),
  body("peso").isDecimal(),
  body("fechaNacimiento").isISO8601(),
];

//middleware para validar el nuevo libro
export const validarNuevoLibro = () => [
  body("titulo").isString().notEmpty().isLength({ max: 200 }),
  body("isbn").isString().notEmpty().isLength({ max: 20 }),
  body("genero_nombre").isString().notEmpty().isLength({ max: 100 }),
  body("autor_nombre").isString().notEmpty().isLength({ max: 150 }),
  body("editorial_nombre").isString().notEmpty().isLength({ max: 150 }),
  body("año").isInt({ min: 1900, max: new Date().getFullYear() }),
  body("stock_inicial").isInt({ min: 0 }),
  body("precio_venta").isDecimal({ min: 0 }),
  body("precio_alquiler").isDecimal({ min: 0 }),
  verificarValidaciones,  //middleware de verificación de validaciones
];

//middleware para validar la edición de un libro
export const validarEdicionLibro = () => [
  param("libro_id").isInt({ min: 1 }),
  body("i_titulo").optional().isString().isLength({ max: 200 }),
  body("i_genero_nombre").optional().isString().isLength({ max: 100 }),
  body("i_autor_nombre").optional().isString().isLength({ max: 150 }),
  body("i_editorial_nombre").optional().isString().isLength({ max: 150 }),
  body("i_año").optional().isInt({ min: 1800, max: new Date().getFullYear() }),
  body("i_precio_venta").optional().isDecimal({ min: 0 }),
  body("i_precio_alquiler").optional().isDecimal({ min: 0 }),
  verificarValidaciones,  //verificación en las validaciones
];

//middleware para la búsqueda de libros
export const validarBusquedaLibro = [
  query("titulo").optional().isString().isLength({ max: 200 }),
  query("autor_nombre").optional().isString().isLength({ max: 150 }),
  query("isbn").optional().isString().isLength({ max: 20 }),
  verificarValidaciones,  // Verifica las validaciones
];

//middleware para Validar los campos de la Solicitud al crear un empleado
export const validarCrearEmpleado = [
  body("nombre").notEmpty().isString().isLength({ max: 150 }),
  body("cargo").notEmpty().isString().isLength({ max: 100 }),
  body("salario").notEmpty().isDecimal({ min: 0 }),
  body("fecha_contrato").notEmpty().isDate(),
  body("username").notEmpty().isString().isLength({ max: 50 }),
  body("password").notEmpty().isString().isLength({ min: 8 }),
  body("rol").notEmpty().isIn(["administrador", "empleado"]),
  verificarValidaciones,
];

//middleware de validación para crear proveedor
export const validarCrearProveedor = [
  body("nombre").notEmpty().isString().isLength({ max: 150 }),
  body("telefono").notEmpty().isString().isLength({ max: 20 }),
  body("email").notEmpty().isEmail().isLength({ max: 100 }),
  body("direccion").notEmpty().isString().isLength({ max: 200 }),
  verificarValidaciones,
];

//middleware para validar parámetros en libroStockBajo
export const validarLibroStockBajo = [
  query("cantidad")
    .notEmpty()
    .withMessage("La cantidad es requerida.")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero mayor o igual a 1."),
  verificarValidaciones,
];

//middleware para validar Datos en agregarStock
export const validarAgregarStock = [
  // id del libro sea positivo
  param("libro_id")
    .notEmpty()
    .withMessage("El ID del libro es requerido.")
    .isInt({ min: 1 })
    .withMessage("El ID del libro debe ser un número entero positivo."),
  
// validar nombre de proveedor
    body("nombre_proveedor")
    .notEmpty()
    .withMessage("El nombre del proveedor es requerido.")
    .isString()
    .withMessage("El nombre del proveedor debe ser una cadena de texto.")
    .isLength({ max: 150 })
    .withMessage("El nombre del proveedor no puede exceder los 150 caracteres."),

  // Validar que cantidad sea un número positivo
  body("cantidad")
    .notEmpty()
    .withMessage("La cantidad es requerida.")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo."),

  // validar costo de compra como positivo y decimal
  body("costo_compra")
    .optional()
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage("El costo de compra debe ser un número decimal con hasta dos decimales.")
    .custom((value) => value >= 0)
    .withMessage("El costo de compra debe ser positivo o cero."),

  verificarValidaciones,
];

