import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const number = formData.get("number") as string;
  const descricao = formData.get("descricao") as string;
  const condominionome = formData.get("condominionome") as string;

  if (!number || !descricao || !condominionome) {
    return NextResponse.json(
      { error: "Preencha todos os campos." },
      { status: 400 }
    );
  }

  try {
    const user = await auth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: request.headers,
    });

    if (!user) {
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

    const condominio = await prisma.condominio.findFirst({
      where: {
        nome: condominionome,
        Usuario: {
          id: usuarioExists.id,
        },
      },
    });
    if (!condominio) {
      return NextResponse.json(
        {
          error:
            "Usuário não está associado a um condomínio ou nenhum condomínio pertence a este usuário.",
        },
        { status: 404 }
      );
    }

    const usuarioHasPermition = await prisma.admin.findFirst({
      where: {
        usuarioId: usuarioExists.id,
        condominioId: condominio.id,
      },
    });

    if (!usuarioHasPermition) {
      return NextResponse.json(
        { error: "Usuário não tem permissão para criar uma unidade." },
        { status: 403 }
      );
    }

    await prisma.unidade.create({
      data: {
        numero: number,
        descricao: descricao,
        status: "DISPONIVEL",
        condominio: {
          connect: {
            id: condominio.id,
            nome: condominionome,
          },
        },
      },
    });
    return NextResponse.json({ message: "Dados registrados com sucesso!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao atualizar os dados." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = await auth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: request.headers,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const unidades = await prisma.unidade.findMany({
      where: {
        condominio: {
          criadorId: user.user.id,
        },
      },
    });

    return NextResponse.json(unidades);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao buscar unidades." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const formData = await request.formData();
  const unidadeNome = formData.get("unidadeNome") as string;
  const condominioId = formData.get("condominioId") as string;

  if (!unidadeNome || !condominioId) {
    return NextResponse.json(
      { error: "Preencha todos os campos obrigatórios." },
      { status: 400 }
    );
  }

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

    // Verifica se o condomínio existe e pertence ao usuário
    const condominio = await prisma.condominio.findUnique({
      where: { id: condominioId },
    });

    if (!condominio || condominio.criadorId !== user.user.id) {
      return NextResponse.json(
        { error: "Condomínio não encontrado ou não pertence ao usuário." },
        { status: 403 }
      );
    }

    // Verifica se a unidade existe e pertence ao condomínio
    const unidade = await prisma.unidade.findFirst({
      where: {
        numero: unidadeNome,
        condominioId: condominioId,
      },
    });

    if (!unidade) {
      return NextResponse.json(
        { error: "Unidade não encontrada ou não pertence ao condomínio." },
        { status: 404 }
      );
    }

    // Remove a unidade
    await prisma.unidade.delete({
      where: { id: unidade.id },
    });

    return NextResponse.json({
      message: "Unidade removida com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao remover a unidade." },
      { status: 500 }
    );
  }
}
