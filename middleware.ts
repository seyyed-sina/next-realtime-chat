import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { routes } from '@constants';

export default auth(function middleware(req) {
  const {
    auth,
    url,
    nextUrl: { pathname },
  } = req;
  const isAuthenticated = !!auth;
  console.log('isAuthenticated: ', isAuthenticated);

  if (pathname.startsWith(routes.SIGN_IN) && isAuthenticated) {
    return NextResponse.redirect(new URL(routes.HOME, url));
  }

  if (!pathname.startsWith(routes.SIGN_IN) && !isAuthenticated) {
    return NextResponse.redirect(new URL(routes.SIGN_IN, url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
