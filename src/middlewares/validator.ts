/* eslint-disable no-template-curly-in-string */
import { Schema, ValidationError } from "yup";
import { AppError } from "../errors/AppError";
import { Request, Response, NextFunction } from "express";

class Validator {
  validate =
    (schema: Schema) =>
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
      try {
        const { body } = req;
        await schema.validate(body);
        return next();
      } catch (error: any) {
        if (error instanceof ValidationError) {
          return res.status(400).json({
            field: error.path,
            message: error.errors[0],
          });
        }

        throw new AppError(error.message, 400);
      }
    };
}

export default Validator;