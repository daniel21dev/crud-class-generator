import { UserCrud } from './types/UserCrud'
import { PrismaClient } from '@prisma/client'

class UserService extends UserCrud {
  constructor(prisma: PrismaClient) {
    super(prisma)
  }
}

const usersService = new UserService(new PrismaClient())

const users = usersService.find({})
