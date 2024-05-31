import { AppError } from "../../errors/AppError";
import { IUserService } from "../../interfaces/user";
import { User, Prisma } from "@prisma/client";
import prismaClient from "../../database"

class UserService implements IUserService {
   store = async (data: User): Promise<User> => {
    try {
      const user = await prismaClient.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      return user;
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new AppError("Email já cadastrado.", 400);
        }
      }

      throw new AppError(e.message || "Erro ao criar usuário.", 400);
    }
  }

  index = async ({
    page = 1,
    limit = 10,
    q = "",
  }): Promise<User[]> => {
    try {
      const users = await prismaClient.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: q,
              },
            },
            {
              email: {
                contains: q,
              },
            },
          ],
        },
        take: limit,
        skip: (page - 1) * limit,
      });

      return users;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao listar usuários.", 400);
    }
  }

  count = async (): Promise<number> => {
    try {
      const count = await prismaClient.user.count();

      return count;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao contar usuários.", 400);
    }
  }

  show = async (id: string): Promise<User> => {
    try {
      const user = await prismaClient.user.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      return user;
    } catch (e: any) {
      if (e.code === "P2025") {
        throw new AppError("Usuário não encontrado.", 404)
      }

      throw new AppError(e.message || "Erro ao buscar usuário.", 400);
    }
  }

  findByEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          email: email,
        },
      });

      return user;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao buscar usuário.", 400);
    }
  }

  update = async (id: string, data: User): Promise<User> => {
    try {
      const user = await prismaClient.user.update({
        where: {
          id: id,
        },
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      return user;
    } catch (e: any) {
      throw new AppError(e.message || "Erro ao atualizar usuário.", 400);
    }
  }

  delete = async (id: string): Promise<void> => {
    try {
      await prismaClient.user.delete({
        where: {
          id: id,
        },
      });
    }
    catch (e: any) {
      throw new AppError(e.message || "Erro ao deletar usuário.", 400);
    }
  }
}

export default UserService;
