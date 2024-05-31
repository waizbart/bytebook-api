import { Router } from "express";
import AuthController from "./auth.controller";
import { AuthSchema } from "./auth.schema";
import Validator from "../../middlewares/validator";

const routes = Router();
const authController = new AuthController();
const validator = new Validator();

routes.post(
    "/login",
    validator.validate(AuthSchema.login),
    authController.login
);

routes.get(
    "/me",
    authController.me
);

export default routes;
