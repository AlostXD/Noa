import { NextResponse } from "next/server";
import { payload } from "pix-payload";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const unidadeId = body.unidadeId as string;

    if (!unidadeId) {
      return NextResponse.json(
        { error: "ID da unidade não fornecido ou não encontrado." },
        { status: 400 }
      );
    }

    const unidade = await prisma.unidade.findUnique({
      where: { id: unidadeId },
      include: {
        condominio: true,
        moradores: {
          include: { usuario: true },
        },
      },
    });

    if (!unidade) {
      return NextResponse.json(
        { error: "Unidade não encontrada." },
        { status: 404 }
      );
    }

    const condominio = await prisma.condominio.findUnique({
      where: { id: unidade.condominioId },
      include: { Admin: true },
    });

    if (!condominio) {
      return NextResponse.json(
        { error: "Condomínio não encontrado." },
        { status: 404 }
      );
    }

    const respCondo = await prisma.usuario.findUnique({
      where: { id: condominio.criadorId },
    });

    if (!respCondo) {
      return NextResponse.json(
        { error: "Criador do condomínio não encontrado." },
        { status: 404 }
      );
    }

    const pagamentoValor = await prisma.pagamento.findFirst({
      where: { unidadeId: unidade.id },
    });

    if (!pagamentoValor) {
      return NextResponse.json(
        { error: "Pagamento não encontrado." },
        { status: 404 }
      );
    }

    const data = {
      key: respCondo.cpf, // ou respCondo.chavePix se tiver
      name: respCondo.nome.slice(0, 25),
      city: respCondo.cidade.normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 15),
      amount: Number(pagamentoValor.valor.toFixed(2)),
      transactionId: `Pix`,
    };

    const myPayload = payload(data);

    return NextResponse.json({
      payload: myPayload,
    })
  } catch (error) {
    console.error("Erro na API gerar-pix:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
