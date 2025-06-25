import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const unidadeId = url.pathname.split("/unidade/").pop(); // Extrai o ID da unidade da URL

  if (!unidadeId) {
    return NextResponse.json(
      { error: "ID da unidade não fornecido." },
      { status: 400 }
    );
  }

  try {
    const unidade = await prisma.unidade.findUnique({
      where: { id: unidadeId },
      include: {
        condominio: true, // Inclui os dados do condomínio relacionado
        moradores: {
          include: {
            usuario: true, // Inclui os dados dos moradores relacionados
          },
        },
        pagamentos: true, // Inclui os pagamentos relacionados
      },
    });

    if (!unidade) {
      return NextResponse.json(
        { error: "Unidade não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(unidade);
  } catch (error) {
    console.error("Erro ao buscar os detalhes da unidade:", error);
    return NextResponse.json(
      { error: "Erro ao buscar os detalhes da unidade." },
      { status: 500 }
    );
  }
}
