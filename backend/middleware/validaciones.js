import { param, body, validationResult } from "express-validator";

export const verificarValidaciones = (req, res, next) => {
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
