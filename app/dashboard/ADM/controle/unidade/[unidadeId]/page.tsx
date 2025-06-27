"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavbarDashboardAdm from "@/app/components/navbarDashboardAdm";

export default function UnidadeDetalhes() {
  const params = useParams(); // Captura os parâmetros dinâmicos da URL
  const unidadeId = params?.unidadeId; // Obtém o ID da unidade
  const [unidade, setUnidade] = useState<{
    id: string;
    numero: string;
    descricao: string;
    status: string;
    pagamentos: {
      id: string;
      dataVencimento: string;
      valor: number;
      status: string;
    }[];
    condominio: { id: string; nome: string };
    moradores: { usuario: { nome: string; email: string; cpf: string } }[];
  } | null>(null);
  const [loading, setLoading] = useState(true); // Estado para exibir carregamento
  const [error, setError] = useState<string | null>(null); // Estado para exibir erros

  useEffect(() => {
    if (unidadeId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/unidade/${unidadeId}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar os detalhes da unidade.");
          }
          const result = await response.json();
          setUnidade(result); // Define os dados da unidade
        } catch (error) {
          console.error(error);
          setError("Erro ao carregar os detalhes da unidade.");
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      };

      fetchData();
    }
  }, [unidadeId]);

  const calcularStatusPagamento = (
    dataVencimento: string,
    statusAtual: "PENDENTE" | "PAGO" | "ATRASADO"
  ): string => {
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
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ATRASADO":
        return "inline-block w-full font-semibold text-white bg-red-700 rounded-md px-3 py-1";
      case "PENDENTE":
        return "inline-block w-full font-semibold text-white bg-orange-600 rounded-md px-3 py-1";
      case "PAGO":
        return "inline-block w-full font-semibold text-white bg-green-500 rounded-md px-3 py-1";
      default:
        return " inline-block w-full font-semibold text-white bg-gray-300 rounded-md px-3 py-1";
    }
  };

  const formatDateToBrasilia = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // const marcarComoPago = async (pagamentoId: string) => {
  //   try {
  //     const response = await fetch(`/api/pagamento/${pagamentoId}`, {
  //       method: "PATCH",
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       alert(errorData.error || "Erro ao atualizar o pagamento.");
  //       return;
  //     }

  //     alert("Pagamento atualizado para PAGO com sucesso!");
  //     window.location.reload(); // Recarrega a página para atualizar os dados
  //   } catch (error) {
  //     console.error("Erro ao atualizar o pagamento:", error);
  //     alert("Erro ao atualizar o pagamento.");
  //   }
  // };

  if (loading) {
    return (
      <div className="flex flex-row min-h-screen items-center text-white justify-center w-full bg-white [background:linear-gradient(90deg,rgba(7,21,49,1)_0%,rgba(7,22,50,1)_6%,rgba(7,24,53,1)_13%,rgba(6,27,58,1)_19%,rgba(6,32,64,1)_25%,rgba(5,37,72,1)_31%,rgba(5,44,80,1)_38%,rgba(4,50,90,1)_44%,rgba(4,58,100,1)_50%,rgba(3,65,110,1)_56%,rgba(2,78,128,1)_69%,rgba(1,83,136,1)_75%,rgba(1,88,142,1)_81%,rgba(0,91,147,1)_88%)]">
        <h1 className="font-bold text-2xl">Carregando informações....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-row min-h-screen items-center text-white justify-center w-full bg-white [background:linear-gradient(90deg,rgba(7,21,49,1)_0%,rgba(7,22,50,1)_6%,rgba(7,24,53,1)_13%,rgba(6,27,58,1)_19%,rgba(6,32,64,1)_25%,rgba(5,37,72,1)_31%,rgba(5,44,80,1)_38%,rgba(4,50,90,1)_44%,rgba(4,58,100,1)_50%,rgba(3,65,110,1)_56%,rgba(2,78,128,1)_69%,rgba(1,83,136,1)_75%,rgba(1,88,142,1)_81%,rgba(0,91,147,1)_88%)]">
        <h1 className="font-bold text-2xl">{error}</h1>
      </div>
    );
  }

  if (!unidade) {
    return <p>Unidade não encontrada.</p>;
  }

  return (
    <>
      <NavbarDashboardAdm />
      <div className="p-4 min-h-screen flex flex-col items-center">
        {/* Informações da Unidade    border-t border-l border-r*/}
        <div className="w-full max-w-4xl bg-white rounded-[30px] mb-8 font-poppins min-h-screen lg:min-h-[80vh] flex flex-col">
          <div className="p-6 mb-8 border-1 rounded-t-[30px] border-slate-300">
            <h1 className="text-2xl md:text-4xl font-bold text-center">
              Unidade {unidade.numero}
            </h1>
            <p className="text-left mt-2 italic text-md md:text-lg md:text-lg text-black">
              <span className="font-semibold italic rounded-md  inline-block">
                {unidade.status}
              </span>
            </p>
            <p className="text-sm text-left mt-2 italic">
              <span className="">Descrição:</span>{" "}
              {unidade.descricao}
            </p>
            <p className="text-sm text-left mt-2">
              <span className="">Condomínio:</span>{" "}
              {unidade.condominio.nome}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 border-b-1 border-l-1 border-r-1 border-slate-300 rounded-b-[30px] w-full flex-grow min-h-[40vh]">
            {/* Moradores */}
            <div className="w-[95%] bg-white shadow-md rounded-xl p-6 border border-slate-300/60">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Moradores</h2>
              <div className="space-y-4">
                {unidade.moradores.map((morador, index) => (
                  <div key={index} className="border rounded-lg p-4 ">
                    <p className="font-semibold">
                      Nome: {morador.usuario.nome}
                    </p>
                    <p>Email: {morador.usuario.email}</p>
                    <p>CPF: {morador.usuario.cpf}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagamentos */}
            <div className="w-[95%]  bg-white shadow-md rounded-xl p-6 mb-4 border border-slate-300/50">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Pagamentos</h2>
              <div className="space-y-4">
                {unidade.pagamentos.map((pagamento) => {
                  const statusAtualizado = calcularStatusPagamento(
                    pagamento.dataVencimento,
                    pagamento.status as "PENDENTE" | "PAGO" | "ATRASADO"
                  );

                  return (
                    <div
                      key={pagamento.id}
                      className="w-[300px] border rounded-lg p-4 shadow-sm"
                    >
                      <p className="font-semibold">
                        Data de Vencimento:{" "}
                        {formatDateToBrasilia(pagamento.dataVencimento)}
                      </p>
                      <p>Valor: R$ {pagamento.valor.toFixed(2)}</p>
                      <p className="pt-4">
                        <span className={getStatusColor(statusAtualizado)}>
                          {statusAtualizado}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
