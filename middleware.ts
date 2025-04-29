import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request, {
    cookiePrefix: "noa",
  });
  const session = await auth.api.getSession({
      headers: await headers()
  })
  
	if (!sessionCookie && !session) {
		return NextResponse.redirect(new URL("/", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
  runtime: "nodejs",
	matcher: ["/dashboard/:path"], // Specify the routes the middleware applies to
};