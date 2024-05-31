import { Request, Response } from "express";
import UserService from "./user.service";
import { Application } from "../../classes/Application";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  store = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.store(req.body);

      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(e.statusCode || 400).json({
        message: e.message,
        version: Application.version,
        success: false,
      });
    }
  }

  index = async (req: Request, res: Response) => {
    try {
      const {
        page = 1,
        limit = 10,
        q,
      } = req.query as { [key: string]: string }

      const response = await this.userService.index({
        page: +page,
        limit: +limit,
        q,
      });

      const count = await this.userService.count();

      return res.status(200).json({
        results: response,
        total: count,
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

  show = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.show(req.params.id);

      return res.status(200).json(response);
    } catch (e: any) {
      return res.status(e.statusCode || 400).json({
        message: e.message,
        version: Application.version,
        success: false,
      });
    }
  }


  update = async (req: Request, res: Response) => {
    try {
      const response = await this.userService.update(req.params.id, req.body);

      return res.status(200).json(response);
    } catch (e: any) {
      return res.status(e.statusCode || 400).json({
        message: e.message,
        version: Application.version,
        success: false,
      });
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      await this.userService.delete(req.params.id);

      return res.status(204).send();
    } catch (e: any) {
      return res.status(e.statusCode || 400).json({
        message: e.message,
        version: Application.version,
        success: false,
      });
    }
  }
}

export default UserController;