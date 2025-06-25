import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calcularStatusPagamento } from "./utils";

export async function GET() {
  try {
    const pagamentos = await prisma.pagamento.findMany();

    // Atualiza o status com base na data de vencimento, exceto se já for "PAGO"
    const pagamentosAtualizados = await Promise.all(
      pagamentos.map(async (pagamento) => {
        const novoStatus = calcularStatusPagamento(
          pagamento.dataVencimento,
          pagamento.status as "PENDENTE" | "PAGO" | "ATRASADO"
        );

        if (pagamento.status !== novoStatus) {
          await prisma.pagamento.update({
            where: { id: pagamento.id },
            data: { status: novoStatus },
          });
        }

        return { ...pagamento, status: novoStatus };
      })
    );

    return NextResponse.json(pagamentosAtualizados);
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar pagamentos." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const unidadeNome = formData.get("unidadeNome") as string;
  const valor = parseFloat(formData.get("valor") as string);
  const dataVencimento = formData.get("dataVencimento") as string;

  if (!unidadeNome || isNaN(valor) || !dataVencimento) {
    return NextResponse.json(
      { error: "Preencha todos os campos obrigatórios." },
      { status: 400 }
    );
  }

  try {
    // Busca a unidade pelo nome
    const unidade = await prisma.unidade.findFirst({
      where: { numero: unidadeNome },
      include: { condominio: true }, // Inclui o condomínio relacionado
    });

    if (!unidade) {
      return NextResponse.json(
        { error: "Unidade não encontrada." },
        { status: 404 }
      );
    }

    if (!unidade.condominio) {
      return NextResponse.json(
        { error: "Condomínio relacionado à unidade não encontrado." },
        { status: 404 }
      );
    }

    // Cria o pagamento associado à unidade e ao condomínio
    await prisma.pagamento.create({
      data: {
        valor,
        dataVencimento: new Date(dataVencimento),
        status: "PENDENTE",
        unidadeId: unidade.id,
        condominioId: unidade.condominio.id, // Associa o pagamento ao condomínio
      },
    });

    return NextResponse.json({
      message: "Pagamento adicionado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao adicionar pagamento:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar pagamento." },
      { status: 500 }
    );
  }
}
