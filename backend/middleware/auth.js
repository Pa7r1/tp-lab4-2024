import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt } from "passport-jwt";

export const authConfig = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      next(null, payload);
    })
  );
};

export const validarJwt = passport.authenticate("jwt", { session: false });

export const validaRol = (rol) => (req, res, next) => {
  if (req.usuario.rol !== rol) {
    return res.status(400).send({ mensaje: `No autorizado para esta accion` });
  }
};
