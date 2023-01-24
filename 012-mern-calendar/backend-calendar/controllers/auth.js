import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../helpers/jwt.js";

const AuthController = {};

AuthController.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    user = new User(req.body);
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = await generateJWT({ uid: user.id, name: user.name });

    return res.status(201).json({
      user,
      token,
      ok: true,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.js ~ line 25 ~ AuthController.register= ~ error",
      error
    );
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

AuthController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }
    const token = await generateJWT({ uid: user.id, name: user.name });

    return res.status(201).json({
      // user,
      user: { uid: user.id, name: user.name },
      token,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

AuthController.refreshToken = async (req, res) => {
  const { uid, name } = req;

  // Generar JWT
  const token = await generateJWT({ uid, name });

  res.json({
    ok: true,
    user: {
      uid,
      name,
    },
    token,
  });
};

export { AuthController };
