"use client";

import { useParams } from "next/navigation"; // Use `useParams` para capturar o ID
import React, { useEffect, useState } from "react";
import NavbarDashboard from "@/app/components/navbarDashboard";

export default function CondominioDetalhes() {
  const params = useParams(); // Captura os parâmetros dinâmicos da URL
  const id = params?.id; // Obtém o ID do condomínio
  const [condominio, setCondominio] = useState<{
    id: string;
    nome: string;
    endereco: string;
    unidades: { id: string; numero: string; descricao: string }[];
    feedbacks: { id: string; mensagem: string }[];
    manutencoes: { id: string; descricao: string; status: string }[];
    pagamentos: { id: string; valor: number; status: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true); // Estado para exibir carregamento
  const [error, setError] = useState<string | null>(null); // Estado para exibir erros

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/condominio/${id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar os detalhes do condomínio.");
          }
          const result = await response.json();
          setCondominio(result); // Define os dados do condomínio
        } catch (error) {
          console.error(error);
          setError("Erro ao carregar os detalhes do condomínio.");
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      };

      fetchData();
    }
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!condominio) {
    return <p>Condomínio não encontrado.</p>;
  }

  return (
    <>
      <NavbarDashboard />
      <div className="p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-center">{condominio.nome}</h1>
        <p className="text-md md:text-lg text-center mt-2">{condominio.endereco}</p>

        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Unidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {condominio.unidades.map((unidade) => (
          <div key={unidade.id} className="border rounded-lg p-4 shadow-sm">
            <p className="font-semibold">Número: {unidade.numero}</p>
            <p>Descrição: {unidade.descricao}</p>
          </div>
        ))}
          </div>
        </div>

        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Feedbacks</h2>
          <div className="space-y-4">
        {condominio.feedbacks.map((feedback) => (
          <div key={feedback.id} className="border rounded-lg p-4 shadow-sm">
            <p>{feedback.mensagem}</p>
          </div>
        ))}
          </div>
        </div>

        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Manutenções</h2>
          <div className="space-y-4">
        {condominio.manutencoes.map((manutencao) => (
          <div key={manutencao.id} className="border rounded-lg p-4 shadow-sm">
            <p className="font-semibold">Descrição: {manutencao.descricao}</p>
            <p>Status: {manutencao.status}</p>
          </div>
        ))}
          </div>
        </div>

        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Pagamentos</h2>
          <div className="space-y-4">
        {condominio.pagamentos.map((pagamento) => (
          <div key={pagamento.id} className="border rounded-lg p-4 shadow-sm">
            <p className="font-semibold">Valor: R$ {pagamento.valor.toFixed(2)}</p>
            <p>Status: {pagamento.status}</p>
          </div>
        ))}
          </div>
        </div>
      </div>
    </>
  );
}
