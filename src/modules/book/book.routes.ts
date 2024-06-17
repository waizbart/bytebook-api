import { Router } from "express";
import BookController from "./book.controller";
import { BookSchema } from "./book.schema";
import Validator from "../../middlewares/validator";
import Authorizer from "../../middlewares/authorizer";

const routes = Router();
const book = new BookController();
const validator = new Validator();
const authorizer = new Authorizer();

routes.post(
  "/books",
  authorizer.ensureIsAuthenticated,
  validator.validate(BookSchema.create),
  book.store
);
routes.get("/books", authorizer.ensureIsAuthenticated, book.index);
routes.get("/books/:id", authorizer.ensureIsAuthenticated, book.get);
routes.put(
  "/books/:id",
  authorizer.ensureIsAuthenticated,
  validator.validate(BookSchema.update),
  book.update
);
routes.delete("/books/:id", authorizer.ensureIsAuthenticated, book.delete);

export default routes;
