import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define routes that are public
const publicRoutes = ['/sign-in', '/sign-up'];

export default authMiddleware({
  publicRoutes: (req) => {
    // Check if the request path is a public route
    return publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  },
  afterAuth: (auth, req) => {
    const { userId, orgId } = auth;

    // If user is not logged in and tries to access a non-public route, redirect to sign-in page
    if (!userId && !publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // TEMPORARY: Redirect to orgs page if user is logged in and trying to access home
    if (userId && req.nextUrl.pathname === '/') {
      const path = orgId ? `/organization/${orgId}` : '/select-org';
      return NextResponse.redirect(new URL(path, req.url));
    }

    // Redirect signed-in users away from sign-in and sign-up pages
    if (userId && publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
      const path = orgId ? `/organization/${orgId}` : '/select-org';
      return NextResponse.redirect(new URL(path, req.url));
    }

    // Force user to select or create an organization if not done yet
    if (userId && !orgId && req.nextUrl.pathname !== '/select-org') {
      return NextResponse.redirect(new URL('/select-org', req.url));
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
