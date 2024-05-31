import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      $allOperations({ operation, args, query }: {
        operation: string
        args: any
        query: any
      }) {
        if (['create', 'update'].includes(operation) && args.data['password']) {
          args.data['password'] = bcrypt.hashSync(args.data['password'], 10)
        }
        return query(args)
      },
    }
  }
})

export default prisma;