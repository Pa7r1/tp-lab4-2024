import { param, body, validationResult } from "express-validator";

export const verificarValidaciones = (req, res, next) => {
  // Enviar errores de validacion en caso de ocurrir alguno.
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }
  next();
};

export const validarId = param("id").isInt({ min: 1 });

export const validarUsuario = [
  body("username").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("password").isStrongPassword({
    minLength: 8, // Minino de 8 caracteres (letras y numeros)
    minLowercase: 1, // Al menos una letra minuscula
    minUppercase: 1, // Al menos una letra mayusculas
    minNumbers: 1, // Al menos un numero
    minSymbols: 0, // Sin simbolos
  }),
  body("rol").isAlpha().notEmpty().isLength({ max: 45 }),
];

// middleware para verificar parametros de consultas empleando express-validator
export const validarConsulta = () => [
  query("edad_gt").isInt({ min: 0 }).optional(),
  query("edad_lt").isInt({ min: 0 }).optional(),
  query("altura_gt").isFloat({ min: 0 }).optional(),
  query("altura_lt").isFloat({ min: 0 }).optional(),
];

// middleware para verificar datos de persona empleando express-validator
export const validarPersona = () => [
  body("nombre").isAlpha().notEmpty().isLength({ max: 50 }),
  body("apellido").isAlpha().notEmpty().isLength({ max: 50 }),
  body("edad").isInt({ min: 1 }),
  body("altura").isFloat({ min: 1 }),
  body("peso").isDecimal(),
  body("fechaNacimiento").isISO8601(),
];
