import { User } from "@prisma/client";

interface IUserService {
  store(data: User): Promise<User>;
  index({
    page,
    limit,
    q
  }: {
    page: number,
    limit: number,
    q: string
  }): Promise<User[]>;
  show(id: string): Promise<User>;
  update(id: string, data: User): Promise<User>;
  delete(id: string): Promise<void>;
}

export {
  IUserService,
};
