import { AppError } from "../../errors/AppError";
import { IBookService } from "../../interfaces/book";
import { Book } from "@prisma/client";
import prismaClient from "../../database"

class BookService implements IBookService {
   store = async (data: Book): Promise<Book> => {
    try {
      const book = await prismaClient.book.create({
        data: {
          google_books_id: data.google_books_id,
          userId: data.userId,
          tag: data.tag,
        }
      });

      return book;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao criar reserva.", 400);
    }
  }

  index = async ({
    userId,
    tag,
  }: {
    userId: string,
    tag: string,
  }): Promise<Book[]> => {
    try {
      const books = await prismaClient.book.findMany({
        where: {
          userId: userId,
          tag: tag,
        },
      });

      return books;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao buscar reservas.", 400);
    }
  }

  count = async (): Promise<number> => {
    try {
      const count = await prismaClient.book.count();

      return count;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao contar reservas.", 400);
    }
  }

  show = async (id: string): Promise<Book | null> => {
    try {
      const book = await prismaClient.book.findUnique({
        where: {
          id: id,
        },
      });

      return book;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao buscar reserva.", 400);
    }
  }

  update = async (id: string, data: Book): Promise<Book> => {
    try {
      const book = await prismaClient.book.update({
        where: {
          id: id,
        },
        data: data,
      });

      return book;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao atualizar reserva.", 400);
    }
  }

  delete = async (id: string): Promise<void> => {
    try {
      await prismaClient.book.delete({
        where: {
          id: id,
        },
      });
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao deletar reserva.", 400);
    }
  }
}

export default BookService;
