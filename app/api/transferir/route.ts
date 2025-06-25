import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const formData = await request.formData();
  const unidadeNome = formData.get("unidadeNome") as string;
  const novoResponsavelEmail = formData.get("novoResponsavelEmail") as string;
  const novoCondominioNome = formData.get("novoCondominioNome") as string;
  const condominioId = formData.get("condominioId") as string;

  if (
    !unidadeNome ||
    !novoResponsavelEmail ||
    !novoCondominioNome ||
    !condominioId
  ) {
    return NextResponse.json(
      { error: "Preencha todos os campos obrigatórios." },
      { status: 400 }
    );
  }

  try {
    // Verifica se a unidade existe e pertence ao condomínio atual
    const unidade = await prisma.unidade.findFirst({
      where: {
        numero: unidadeNome,
        condominioId: condominioId,
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

    // Verifica se o novo responsável existe
    const novoResponsavel = await prisma.usuario.findUnique({
      where: { email: novoResponsavelEmail },
    });

    if (!novoResponsavel) {
      return NextResponse.json(
        { error: "Novo responsável não encontrado pelo email fornecido." },
        { status: 404 }
      );
    }

    // Verifica se o novo condomínio existe
    const novoCondominio = await prisma.condominio.findFirst({
      where: { nome: novoCondominioNome },
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

    return NextResponse.json({
      message: "Unidade transferida com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao transferir a unidade." },
      { status: 500 }
    );
  }
}
