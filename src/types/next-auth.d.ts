import type { DefaultSession, User } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

// Extend session and token types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    id?: string;
    user: {
      id?: string;
      email?: string;
    } & User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
  }
}
