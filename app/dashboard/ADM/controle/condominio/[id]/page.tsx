"use client";

import { useParams } from "next/navigation"; // Use `useParams` para capturar o ID
import React, { useEffect, useState } from "react";
import NavbarDashboard from "@/app/components/navbarDashboard";
import toast from "react-hot-toast";

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
    Admin: {
      id: string;
      usuario: { nome: string; email: string; cpf: string };
    }[];
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

  const handleEdit = async (formData: FormData) => {
    try {
      const response = await fetch("/api/editar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Erro ao editar as informações.");
        return;
      }

      const result = await response.json();
      toast.success(result.message || "Informações atualizadas com sucesso!");
      console.log("Informações atualizadas com sucesso:", result);
    } catch (error) {
      console.error("Erro ao editar as informações:", error);
      toast.error("Erro ao editar as informações.");
    }
  };

  const handleRemoveUnidade = async (formData: FormData) => {
    try {
      const response = await fetch("/api/unidade", {
        method: "DELETE",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Erro ao remover a unidade.");
        return;
      }

      const result = await response.json();
      toast.success(result.message || "Unidade removida com sucesso!");
      console.log("Unidade removida com sucesso:", result);
    } catch (error) {
      console.error("Erro ao remover a unidade:", error);
      toast.error("Erro ao remover a unidade.");
    }
  };

  const handleTransferUnidade = async (formData: FormData) => {
    try {
      const response = await fetch("/api/transferir", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Erro ao transferir a unidade.");
        return;
      }

      const result = await response.json();
      toast.success(result.message || "Unidade transferida com sucesso!");
      console.log("Unidade transferida com sucesso:", result);
    } catch (error) {
      console.error("Erro ao transferir a unidade:", error);
      toast.error("Erro ao transferir a unidade.");
    }
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

  if (!condominio) {
    return <p>Condomínio não encontrado.</p>;
  }

  return (
    <>
      <NavbarDashboard />
      <div className="p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          {condominio.nome}
        </h1>
        <p className="text-md md:text-lg text-center mt-2">
          {condominio.endereco}
        </p>

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
              <div
                key={feedback.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <p>{feedback.mensagem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Manutenções</h2>
          <div className="space-y-4">
            {condominio.manutencoes.map((manutencao) => (
              <div
                key={manutencao.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <p className="font-semibold">
                  Descrição: {manutencao.descricao}
                </p>
                <p>Status: {manutencao.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Pagamentos</h2>
          <div className="space-y-4">
            {condominio.pagamentos.map((pagamento) => (
              <div
                key={pagamento.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <p className="font-semibold">
                  Valor: R$ {pagamento.valor.toFixed(2)}
                </p>
                <p>Status: {pagamento.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Administradores
          </h2>
          <div className="space-y-4">
            {condominio.Admin.map((admin) => (
              <div key={admin.id} className="border rounded-lg p-4 shadow-sm">
                <p className="font-semibold">Nome: {admin.usuario.nome}</p>
                <p>Email: {admin.usuario.email}</p>
                <p>CPF: {admin.usuario.cpf}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário para editar informações */}
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Editar Informações
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              formData.append("id", condominio.id); // Adiciona o ID do condomínio

              // Remove campos vazios antes de enviar
              for (const [key, value] of formData.entries()) {
                if (!value) {
                  formData.delete(key);
                }
              }

              handleEdit(formData);
            }}
          >
            <label htmlFor="nome" className="block mb-2 font-semibold">
              Nome do condomínio
            </label>
            <input
              type="text"
              name="nome"
              defaultValue={condominio.nome}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />

            <label htmlFor="endereco" className="block mb-2 font-semibold">
              Endereço do condomínio
            </label>
            <input
              type="text"
              name="endereco"
              defaultValue={condominio.endereco}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />

            <label htmlFor="adminEmail" className="block mb-2 font-semibold">
              Adicionar ou remover administrador (Email)
            </label>
            <input
              type="text"
              name="adminEmail"
              placeholder="Digite o email do administrador (Caso já esteja cadastrado, apenas digite novamente que será removido.)"
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Atualizar
            </button>
          </form>
        </div>

        {/* Formulário para remover unidade */}
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Remover Unidade
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              formData.append("condominioId", condominio.id); // Adiciona o ID do condomínio
              handleRemoveUnidade(formData);
            }}
          >
            <label htmlFor="unidadeNome" className="block mb-2 font-semibold">
              Nome da unidade
            </label>
            <input
              type="text"
              name="unidadeNome"
              placeholder="Digite o nome da unidade"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              required
            />

            <button
              type="submit"
              className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
            >
              Remover Unidade
            </button>
          </form>
        </div>

        {/* Formulário para transferir unidade */}
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Transferir Unidade
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              formData.append("condominioId", condominio.id); // Adiciona o ID do condomínio
              handleTransferUnidade(formData);
            }}
          >
            <label htmlFor="unidadeNome" className="block mb-2 font-semibold">
              Nome da unidade
            </label>
            <input
              type="text"
              name="unidadeNome"
              placeholder="Digite o nome da unidade"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              required
            />

            <label
              htmlFor="novoResponsavelEmail"
              className="block mb-2 font-semibold"
            >
              Email do novo responsável
            </label>
            <input
              type="email"
              name="novoResponsavelEmail"
              placeholder="Digite o email do novo responsável"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              required
            />

            <label
              htmlFor="novoCondominioNome"
              className="block mb-2 font-semibold"
            >
              Nome do novo condomínio
            </label>
            <input
              type="text"
              name="novoCondominioNome"
              placeholder="Digite o nome do novo condomínio"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              required
            />

            <button
              type="submit"
              className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
            >
              Transferir Unidade
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
