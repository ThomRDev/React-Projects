import jwt from "jsonwebtoken";

export const generateJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) return reject("No se pudo generar el token");
        return resolve(token);
      }
    );
  });
};
