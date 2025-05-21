import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("_secure.better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
