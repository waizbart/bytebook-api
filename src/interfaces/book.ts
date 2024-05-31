import { Book } from "@prisma/client";

interface IBookService {
  store(data: Book): Promise<Book>;
  index({
    userId,
    tag,
  }: {
    userId: string,
    tag: string,
  }): Promise<Book[]>;
  count(): Promise<number>;
  update(id: string, data: Book): Promise<Book>;
  delete(id: string): Promise<void>;
}

export {
  IBookService,
};
