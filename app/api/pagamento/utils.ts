export function calcularStatusPagamento(
  dataVencimento: Date,
  statusAtual: "PENDENTE" | "PAGO" | "ATRASADO"
): "PENDENTE" | "PAGO" | "ATRASADO" {
  // Não altera o status se já for "PAGO"
  if (statusAtual === "PAGO") {
    return "PAGO";
  }

  const hoje = new Date();
  const vencimento = new Date(dataVencimento);

  if (hoje > vencimento) {
    return "ATRASADO";
  } else if (hoje.toDateString() === vencimento.toDateString()) {
    return "PENDENTE";
  } else {
    return "PENDENTE";
  }
}
