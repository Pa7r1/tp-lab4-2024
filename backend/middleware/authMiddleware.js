import passport from "passport";

export const validarJwt = passport.authenticate("jwt", { session: false });

export const validarRol = (rol) => (req, res, next) => {
  if (req.user.rol != rol) {
    return res
      .status(403)
      .send({ mensaje: "No está autorizado para esta acción." });
  }
  next();
};
