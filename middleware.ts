import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware((auth, req) => {

  const { userId, orgId } = auth();

  // If user is not logged in and tries to access a non public route, redirect to signIn page
  if (!userId && !isPublicRoute(req)) {
    auth().protect();
  }

  // If signed in, if user tries to access signIn/Up page, redirect to organization selection page
  if (userId && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {

    if(userId && isPublicRoute(req)) {
      let path = '/select-org';

      if (orgId) {
        path = `/organization/${orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }
  }

  // If signed in and an organization was not selected, force user to select or create one
  if (userId && !orgId && req.nextUrl.pathname !== '/select-org') {
    
    const orgSelection = new URL('/select-org', req.url);
    return NextResponse.redirect(orgSelection);
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}