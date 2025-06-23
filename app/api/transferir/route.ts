import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    // Processa o formData
    const formData = await request.formData();
    const unidadeNome = formData.get("unidadeNome") as string;
    const novoResponsavelEmail = formData.get("novoResponsavelEmail") as string;
    const novoCondominioNome = formData.get("novoCondominioNome") as string;
    const condominioId = formData.get("condominioId") as string;

    // Valida os campos obrigatórios
    if (!unidadeNome || !novoResponsavelEmail || !novoCondominioNome) {
      return NextResponse.json(
        { error: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    // Obtém a sessão do usuário autenticado
    const session = await auth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    // Verifica o condomínio atual
    const condominioAtual = await prisma.condominio.findFirst({
      where: {
        criadorId: session.user.id,
        id: condominioId
      },
    });

    if (!condominioAtual) {
      return NextResponse.json(
        { error: "Condomínio atual não encontrado." },
        { status: 404 }
      );
    }

    // Verifica a unidade no condomínio atual
    const unidade = await prisma.unidade.findFirst({
      where: {
        numero: unidadeNome,
        condominioId: condominioAtual.id,
      },
    });

    if (!unidade) {
      return NextResponse.json(
        {
          error: "Unidade não encontrada ou não pertence ao condomínio atual.",
        },
        { status: 404 }
      );
    }

    // Verifica o novo responsável
    const novoResponsavel = await prisma.usuario.findUnique({
      where: { email: novoResponsavelEmail },
    });

    if (!novoResponsavel) {
      return NextResponse.json(
        { error: "Novo responsável não encontrado pelo email fornecido." },
        { status: 404 }
      );
    }

    // Verifica o novo condomínio
    const novoCondominio = await prisma.condominio.findFirst({
      where: {
        nome: novoCondominioNome,
        criadorId: novoResponsavel.id,
      },
    });

    if (!novoCondominio) {
      return NextResponse.json(
        { error: "Novo condomínio não encontrado pelo nome fornecido." },
        { status: 404 }
      );
    }

    // Atualiza a unidade para o novo condomínio
    await prisma.unidade.update({
      where: { id: unidade.id },
      data: {
        condominioId: novoCondominio.id,
      },
    });

    // Atualiza o responsável pela unidade
    await prisma.usuarioUnidade.upsert({
      where: {
        usuarioId_unidadeId_papel: {
          usuarioId: novoResponsavel.id,
          unidadeId: unidade.id,
          papel: "MORADOR",
        },
      },
      update: {},
      create: {
        usuarioId: novoResponsavel.id,
        unidadeId: unidade.id,
        papel: "MORADOR",
      },
    });

    // Retorna sucesso
    return NextResponse.json({
      message: "Unidade transferida com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao transferir a unidade:", error);

    // Garante que o erro seja retornado como JSON válido
    return NextResponse.json(
      { error: "Erro ao transferir a unidade." },
      { status: 500 }
    );
  }
}
