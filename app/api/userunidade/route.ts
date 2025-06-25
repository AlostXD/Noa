import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const emailUsuario = formData.get("emailUsuario") as string;
  const unidadeNome = formData.get("unidadeNome") as string;
  let papel = formData.get("papel") as string;

  if (!emailUsuario || !unidadeNome) {
    return NextResponse.json(
      { error: "Preencha todos os campos obrigatórios." },
      { status: 400 }
    );
  }

  // Define o papel padrão como "MORADOR" caso não seja fornecido
  papel = papel ? papel.toUpperCase() : "MORADOR";

  // Verifica se o papel é válido
  const validRoles = ["MORADOR", "OPERADOR", "ADMIN"];
  if (!validRoles.includes(papel)) {
    return NextResponse.json(
      { error: "Papel inválido. Use MORADOR, OPERADOR ou ADMIN." },
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

    // Verifica se o usuário autenticado tem permissão para criar registros
    const usuarioAutenticado = await prisma.usuario.findUnique({
      where: { id: user.user.id },
    });

    if (!usuarioAutenticado) {
      return NextResponse.json(
        { error: "Usuário autenticado não encontrado." },
        { status: 404 }
      );
    }

    // Busca a unidade pelo nome e verifica se pertence ao condomínio do usuário autenticado
    const unidade = await prisma.unidade.findFirst({
      where: {
        numero: unidadeNome,
        condominio: {
          criadorId: usuarioAutenticado.id,
        },
      },
    });

    if (!unidade) {
      return NextResponse.json(
        {
          error:
            "Unidade não encontrada ou não pertence ao condomínio do usuário.",
        },
        { status: 404 }
      );
    }

    // Busca o usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: { email: emailUsuario },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário com o email fornecido não encontrado." },
        { status: 404 }
      );
    }

    // Converte o papel para o tipo correto do enum
    const papelEnum = papel as "MORADOR" | "OPERADOR" | "ADMIN";

    // Cria o registro na tabela UsuarioUnidade
    await prisma.usuarioUnidade.create({
      data: {
        usuarioId: usuario.id,
        unidadeId: unidade.id,
        papel: papelEnum, // Usa o papel convertido para o enum
      },
    });

    return NextResponse.json({
      message: "Registro criado com sucesso na tabela UsuarioUnidade.",
    });
  } catch (error) {
    console.error("Erro ao criar registro na tabela UsuarioUnidade:", error);
    return NextResponse.json(
      { error: "Erro ao criar registro na tabela UsuarioUnidade." },
      { status: 500 }
    );
  }
}
