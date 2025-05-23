
import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
  const token = getSessionCookie(request);

  if (!token) {
    console.log("Sem sessão, redirecionando...");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};