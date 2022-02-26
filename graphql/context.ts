import { PrismaClient } from '../node_modules/.prisma/client'
import prisma from '../lib/prisma'
import { getSession, getCsrfToken } from "next-auth/react"

export type NextAuthUser = {
  id?: string,
  name?: string,
  email?: string,
  image?: string,
  expires: string,
  token: string,
}

export type Context = {
  user?: NextAuthUser,
  prisma: PrismaClient,
  accessToken?: string
}

export async function createContext({ req, res }): Promise<Context> {
  const session = await getSession({req});
  const accessToken = await getCsrfToken({ req })

  if (!session) return { prisma }

  const nextUser: NextAuthUser = {
    ...session.user,
    expires: session.expires,
    token: accessToken,
  }

  console.log('token',nextUser)

  return {
    user: nextUser,
    prisma,
    accessToken,
  }
}

/*
import { IncomingMessage } from 'http';

import { Context as ApolloContext } from 'apollo-server-core';
import { PrismaClient, User } from '@prisma/client';
import getSession from 'next-auth';

import prisma from '../lib/prisma';

export async function createContext(context: ApolloApiContext): Promise<Context> {
  const session = await getSession({ req: context.req });
  let user: User | null = null;

  if (session) {
    const sessionWithUser = await prisma.session.findUnique({
      where: { accessToken: session.accessToken as string },
      include: {
        user: true,
      },
    });

    user = sessionWithUser?.user;
  }

  return {
    db: prisma,
    prisma,
    user,
  };
}
*/