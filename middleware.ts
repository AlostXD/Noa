import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  const token = req.cookies.get("better-auth-token")?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
