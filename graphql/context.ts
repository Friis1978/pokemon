import prisma from '../lib/prisma'
import { getSession, getCsrfToken } from "next-auth/react"
import { Context, NextAuthUser } from '../src/types/User';

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