import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Missing required auth environment variable: ${name}`);
  }
  return value;
}

const authSecret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET;
if (!authSecret || authSecret.trim().length === 0) {
  throw new Error('Missing required auth environment variable: NEXTAUTH_SECRET or AUTH_SECRET');
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    GoogleProvider({
      clientId: getRequiredEnv('GOOGLE_CLIENT_ID'),
      clientSecret: getRequiredEnv('GOOGLE_CLIENT_SECRET'),
    }),
    GitHubProvider({
      clientId: getRequiredEnv('GITHUB_ID'),
      clientSecret: getRequiredEnv('GITHUB_SECRET'),
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account) {
        return false;
      }
      if (account.provider === 'google') {
        return typeof account.id_token === 'string' && account.id_token.length > 0 ? true : '/signin?error=google_proof';
      }
      if (account.provider === 'github') {
        return typeof account.access_token === 'string' && account.access_token.length > 0 ? true : '/signin?error=github_proof';
      }
      return false;
    },
    async jwt({ token, account, user }) {
      if (account?.provider === 'google' && typeof account.id_token === 'string') {
        token.provider = 'google';
        token.providerProof = account.id_token;
      }
      if (account?.provider === 'github' && typeof account.access_token === 'string') {
        token.provider = 'github';
        token.providerProof = account.access_token;
      }
      if (typeof user?.id === 'string') {
        token.userId = user.id;
      }
      if (typeof user?.name === 'string' || user?.name === null) {
        token.name = user.name;
      }
      if (typeof user?.email === 'string' || user?.email === null) {
        token.email = user.email;
      }
      if (typeof user?.image === 'string' || user?.image === null) {
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: typeof token.userId === 'string' ? token.userId : typeof token.sub === 'string' ? token.sub : '',
        name: typeof token.name === 'string' ? token.name : null,
        email: typeof token.email === 'string' ? token.email : null,
        image: typeof token.picture === 'string' ? token.picture : null,
      };
      return session;
    },
  },
};

export function getAuthSession() {
  return getServerSession(authOptions);
}
