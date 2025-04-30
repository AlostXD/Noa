import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("better-auth.session_token")?.value;

  console.log("[Middleware] Token:", token);

  if (!token) {
    console.log("[Middleware] Sem sessão, redirecionando...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
