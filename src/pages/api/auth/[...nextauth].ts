import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { verifyPassword } from '@/lib/argon2';
import prisma from '@/lib/prisma';

const options: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: { email: { type: 'email' }, password: { type: 'password' } },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters');
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('Invalid credentials');

        const isPasswordValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isPasswordValid) throw new Error('Invalid credentials');

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default handler;
