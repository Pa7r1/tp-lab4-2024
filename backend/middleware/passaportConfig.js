import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import userModel from "../modelos/usuariosModelo.js";
dotenv.config();

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      const [user] = await userModel.usuarios(payload.username);
      if (!user) {
        return next(null, false, { mensaje: "usuario no encontrado" });
      }
      next(null, payload);
    })
  );
}
