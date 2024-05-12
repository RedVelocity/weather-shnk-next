// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware() {
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next();

  // Set a new response to overwrite cache
  response.headers.set('Cache-Control', 'public');
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:place*',
};
