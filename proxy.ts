import { clerkMiddleware } from '@clerk/nextjs/server';

// Runs on every request so `auth()` is available throughout the app.
// Auth checks themselves live in each page/Server Action that needs them
// (see app/rate-my-catch/upload/page.tsx and app/rate-my-catch/actions.ts),
// per Clerk's resource-based auth guidance.
export default clerkMiddleware();

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico)).*)', '/(api|trpc)(.*)'],
};
