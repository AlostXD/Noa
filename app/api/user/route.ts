import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default async function GET(request: Request) {
  const user = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: request.headers,
  });

  if (!user?.user || !user?.user.id) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

    return NextResponse.json({ user: user.user }, { status: 200 });
}
