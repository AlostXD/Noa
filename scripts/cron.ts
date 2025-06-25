import cron from "node-cron";
import prisma from "@/lib/prisma";
import { calcularStatusPagamento } from "@/app/api/pagamento/utils";

cron.schedule("0 0 * * *", async () => {
  console.log("Executando cron job para atualizar status de pagamentos...");

  try {
    const pagamentos = await prisma.pagamento.findMany();

    await Promise.all(
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
      })
    );

    console.log("Status de pagamentos atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar status de pagamentos:", error);
  }
});
