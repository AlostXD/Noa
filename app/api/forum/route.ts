import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
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

    const formData = await request.formData();
    const titulo = formData.get("titulo") as string;
    const conteudo = formData.get("conteudo") as string;
    const condominioId = formData.get("condominioId") as string;

    if (!titulo || !conteudo || !condominioId) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
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

    // Cria o feedback
    const feedback = await prisma.feedback.create({
      data: {
        titulo,
        conteudo,
        autorId: user.user.id,
        condominioId,
      },
    });

    return NextResponse.json({
      message: "Feedback cadastrado com sucesso!",
      feedback,
    });
  } catch (error) {
    console.error("Erro ao cadastrar feedback:", error);
    return NextResponse.json(
      { error: "Erro ao cadastrar feedback." },
      { status: 500 }
    );
  }
}
