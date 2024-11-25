import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

export function authConfig() {
  // Opciones de configuracion de passport-jwt
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  // Creo estrategia jwt
  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      next(null, payload);
    })
  );
}
