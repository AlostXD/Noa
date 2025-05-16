import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("better-auth.session_token")?.value;

  if (!token) {
    console.log("Sem sessão, redirecionando...");
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    response.headers.set("Access-Control-Allow-Origin", "https://noa-tau.vercel.app/"); // Permitir todas as origens (ou especifique uma origem)
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "https://noa-tau.vercel.app/"); // Permitir todas as origens (ou especifique uma origem)
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
