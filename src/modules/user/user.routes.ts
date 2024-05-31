import { Router } from "express";
import UserController from "./user.controller";
import { UserSchema } from "./user.schema";
import Validator from "../../middlewares/validator";
import Authorizer from "../../middlewares/authorizer";

const routes = Router();
const userController = new UserController();
const validator = new Validator();
const authorizer = new Authorizer();

routes.post(
    "/users",
    validator.validate(UserSchema.create),
    userController.store
);

routes.get(
    "/users",
    authorizer.ensureIsAuthenticated,
    userController.index
);

routes.get(
    "/users/:id",
    authorizer.ensureIsAuthenticated,
    userController.show
);

routes.put(
    "/users/:id",
    validator.validate(UserSchema.update),
    authorizer.ensureIsAuthenticated,
    userController.update
);

routes.delete(
    "/users/:id",
    authorizer.ensureIsAuthenticated,
    userController.delete
);

export default routes;
