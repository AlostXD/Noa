import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  try {
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
    // Check if the Usuario exists
    const usuarioExists = await prisma.usuario.findUnique({
      where: { id: user.user.id },
    });
    if (!usuarioExists) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }
    // Fetch the Condominio associated with the user
    const condominio = await prisma.condominio.findMany({
      where: {
        criadorId: usuarioExists.id,
      }
    });
    if (!condominio) {
      return NextResponse.json(
        { error: "Condomínio não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(condominio);
  } catch (error) {
    return NextResponse.json(error);
  }
}
