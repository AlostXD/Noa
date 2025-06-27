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

    const { searchParams } = new URL(request.url);
    const condominioId = searchParams.get("condominioId");

    if (!condominioId) {
      return NextResponse.json(
        { error: "ID do condomínio não fornecido." },
        { status: 400 }
      );
    }

    // Verifica se o condomínio existe
    const condominio = await prisma.condominio.findUnique({
      where: { id: condominioId },
    });

    if (!condominio) {
      return NextResponse.json(
        { error: "Condomínio não encontrado." },
        { status: 404 }
      );
    }

    // Busca os feedbacks associados ao condomínio
    const feedbacks = await prisma.feedback.findMany({
      where: { condominioId },
      include: { autor: { select: { nome: true } } },
    });

    return NextResponse.json({ message: feedbacks }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar feedbacks:", error);
    return NextResponse.json(
      { error: "Erro ao buscar feedbacks." },
      { status: 500 }
    );
  }
}
