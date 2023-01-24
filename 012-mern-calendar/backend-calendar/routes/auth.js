import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import { authLoginDTO, authRegisterDTO } from "../dtos/index.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
const AuthRouter = Router();

AuthRouter.post("/register", [authRegisterDTO], AuthController.register);
AuthRouter.post("/login", [authLoginDTO], AuthController.login);
AuthRouter.get("/refresh-token", [validateJWT], AuthController.refreshToken);

export default AuthRouter;
