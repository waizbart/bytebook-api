import { Request, Response } from "express";
import UserService from "../user/user.service";
import { Application } from "../../classes/Application";
import bcrypt from "bcrypt";
import jwt, { decode, JwtPayload } from "jsonwebtoken";

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await this.userService.findByEmail(email);

      if (!user) {
        return res.status(401).json({
          message: "Usuário não encontrado.",
          version: Application.version,
          success: false,
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({
          message: "Senha inválida.",
          version: Application.version,
          success: false,
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "7d",
        }
      );

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        version: Application.version,
        success: true,
      });
    } catch (e: any) {
      return res.status(e.statusCode || 400).json({
        message: e.message,
        version: Application.version,
        success: false,
      });
    }
  }

  me = async (req: Request, res: Response) => {
    try {
      const authToken = req.headers.authorization;

      if (!authToken) {
        return res.status(401).json({
          message: "Token não fornecido.",
          version: Application.version,
          success: false,
        });
      }

      const [, token] = authToken.split(" ");

      const decoded = decode(token) as JwtPayload;

      const user = await this.userService.show(decoded.id);

      return res.status(200).json({
        user,
        version: Application.version,
        success: true,
      });
    } catch (e: any) {
      return res.status(e.statusCode || 400).json({
        message: e.message,
        version: Application.version,
        success: false,
      });
    }
  }
}

export default AuthController;