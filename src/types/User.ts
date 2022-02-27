import { PrismaClient } from '../../node_modules/.prisma/client'

export type NextAuthUser = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  expires: string;
  token: string;
};

export type Context = {
  user?: NextAuthUser;
  prisma: PrismaClient;
  accessToken?: string;
};
