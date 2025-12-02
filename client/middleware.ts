import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('customer_token')?.value;

  const protectedRoutes = [
    '/residential/my-account',
    // 'residential/my-account/profile',
    // 'residential/my-account/password',
    // 'residential/my-account/payment-methods',
    // 'residential/my-account/addresses',
    // 'residential/my-account/orders',
    '/residential/cart',
    '/residential/checkout',
    '/builder/my-account',
    '/builder/cart',
    '/commercial/my-account',
  ];

  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  // If user hits protected route without login → redirect to login
  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/residential/:path*', '/builder/:path*', '/commercial/:path*'],
};
