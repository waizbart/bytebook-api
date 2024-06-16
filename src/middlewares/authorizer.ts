import { JwtPayload, decode, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Application } from "../classes/Application";
import { AppError } from "../errors/AppError";

class Authorizer {
    ensureIsAuthenticated = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const authToken = req.headers.authorization;

            if (!authToken)
                return res.status(401).json({
                    version: Application.version,
                    success: false,
                    message: "Token não fornecido.",
                });

            const [, token] = authToken.split(" ");

            verify(token, process.env.JWT_SECRET || "");
            
            return next();
        } catch (e: any) {
            throw new AppError("Token inválido", 401);
        }
    };
}

export default Authorizer;