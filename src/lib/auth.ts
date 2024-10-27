import { UpstashRedisAdapter } from '@auth/upstash-redis-adapter';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

import { env, routes } from '@constants';
import { User } from '@types';
import { fetchRedis } from '@utils';

import { redisDb } from './db';

const getGoogleCredentials = () => {
  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;

  // if (clientId?.length === 0 || !clientId) {
  //   console.log('clientId: ', clientId);
  //   throw new Error('Missing GOOGLE_CLIENT_ID');
  // }

  // if (clientSecret?.length === 0 || !clientSecret) {
  //   throw new Error('Missing GOOGLE_CLIENT_SECRET');
  // }

  return {
    clientId,
    clientSecret,
  };
};

const authOptions = {
  adapter: UpstashRedisAdapter(redisDb),
  providers: [
    Google({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: routes.SIGN_IN,
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await fetchRedis<string>('get', `user:${token.id}`);

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return { ...token, ...(JSON.parse(dbUser) as User) };
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture;
      }
      return session;
    },
    redirect() {
      return routes.HOME;
    },
  },
  debug: false,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
