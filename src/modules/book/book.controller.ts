import { Request, Response } from "express";
import BookService from "./book.service";
import { Application } from "../../classes/Application";

class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  store = async (req: Request, res: Response) => {
    try {
      const user = await this.bookService.store(req.body);

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
        userId,
        tag
      } = req.query as { [key: string]: string }

      const response = await this.bookService.index({
        userId,
        tag
      });

      const count = await this.bookService.count();

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

  update = async (req: Request, res: Response) => {
    try {
      const response = await this.bookService.update(req.params.id, req.body);

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
      await this.bookService.delete(req.params.id);

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

export default BookController;