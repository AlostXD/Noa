"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavbarDashboardAdm from "@/app/components/navbarDashboardAdm";
import Image from "next/image";
import QRCode from "qrcode";

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
  const [pix, setPix] = useState<{
    qrCodeBase64: string;
    payload: string;
  } | null>(null);

  async function gerar(unidadeId: string) {
    try {
      const res = await fetch("/api/gerarpix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unidadeId }), // Envia no corpo da requisição
      });

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      if (data.payload) {
        const qr = await QRCode.toDataURL(data.payload, {
          errorCorrectionLevel: "H",
          type: "image/png",
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });

        setPix({
          ...data,
          qrCodeBase64: qr,
        });
      }
    } catch (error) {
      console.error("Erro ao gerar Pix:", error);
    }
  }

  const atualizarStatusPagamento = async (pagamentoId: string) => {
    try {
      const res = await fetch(`/api/pagamento/${pagamentoId}`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar o status do pagamento.");
      }

      const data = await res.json();
      alert(data.message);
      window.location.reload(); // Recarrega a página para atualizar os dados
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error);
      alert("Erro ao atualizar o pagamento.");
    }
  };

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
        {/* Informações da Unidade */}
        <div className="w-full max-w-4xl bg-white rounded-[30px] mb-8 font-poppins min-h-screen lg:min-h-[80vh] flex flex-col">
          <div className="p-6 mb-8 border-1 rounded-t-[30px] border-slate-300">
            <h1 className="text-xl md:text-2xl font-bold text-center">
              Unidade {unidade.numero}
            </h1>
            <p className="text-center mt-2 italic text-md md:text-lg text-black">
              <span className="font-semibold italic rounded-md inline-block text-center">
                {unidade.status}
              </span>
            </p>
            <p className="text-sm text-left mt-10">
              <span className="font-semibold">Condomínio:</span>{" "}
              {unidade.condominio.nome}
            </p>
            <p className="text-sm text-left mt-2 italic">
              <span className="font-semibold">Descrição:</span>{" "}
              {unidade.descricao}
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
                      {statusAtualizado !== "PAGO" && (
                        <button
                          onClick={() => atualizarStatusPagamento(pagamento.id)}
                          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                          Marcar como Pago
                        </button>
                      )}
                      <button
                        onClick={() => gerar(unidade.id)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Gerar QR Code Pix
                      </button>

                      {pix && (
                        <div className="mt-4 flex flex-col items-center">
                          <Image
                            src={pix.qrCodeBase64}
                            alt="QR Code Pix"
                            width={160}
                            height={160}
                          />
                          <p className="mt-2 font-semibold">Copia e Cola:</p>
                          <textarea
                            readOnly
                            value={pix.payload}
                            className="w-full p-2 border mt-1 rounded bg-gray-100 text-sm"
                          />
                        </div>
                      )}
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
