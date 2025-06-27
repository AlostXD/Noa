"use client";

import { useParams } from "next/navigation"; // Use `useParams` para capturar o ID
import React, { useEffect, useState } from "react";
import NavbarDashboardAdm from "@/app/components/navbarDashboardAdm";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CondominioDetalhes() {
  const params = useParams(); // Captura os parâmetros dinâmicos da URL
  const id = params?.id; // Obtém o ID do condomínio
  const [condominio, setCondominio] = useState<{
    id: string;
    nome: string;
    endereco: string;
    unidades: {
      id: string;
      numero: string;
      descricao: string;
      pagamentos: { id: string; valor: number; status: string }[]; // Pagamentos podem ser opcionais
    }[];
    feedbacks: { id: string; mensagem: string }[];
    manutencoes: { id: string; descricao: string; status: string }[];
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

  const handleCreateUsuarioUnidade = async (formData: FormData) => {
    try {
      const response = await fetch("/api/userunidade", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Erro ao criar o registro.");
        return;
      }

      const result = await response.json();
      toast.success(result.message || "Registro criado com sucesso!");
      console.log("Registro criado com sucesso:", result);
    } catch (error) {
      console.error("Erro ao criar o registro:", error);
      toast.error("Erro ao criar o registro.");
    }
  };

  const handleAddPagamento = async (formData: FormData) => {
    try {
      const response = await fetch("/api/pagamento", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Erro ao adicionar o pagamento.");
        return;
      }

      const result = await response.json();
      toast.success(result.message || "Pagamento adicionado com sucesso!");
      console.log("Pagamento adicionado com sucesso:", result);
    } catch (error) {
      console.error("Erro ao adicionar o pagamento:", error);
      toast.error("Erro ao adicionar o pagamento.");
    }
  };

  const getStatusColor = (pagamentos: { status: string }[] | undefined) => {
    if (!pagamentos || pagamentos.length === 0) return "bg-gray-300"; // Cor padrão caso não haja pagamentos

    const hasAtrasado = pagamentos.some(
      (p) => p.status.toUpperCase() === "ATRASADO"
    );
    const hasPendente = pagamentos.some(
      (p) => p.status.toUpperCase() === "PENDENTE"
    );
    const allPago = pagamentos.every((p) => p.status.toUpperCase() === "PAGO");

    if (hasAtrasado) return "bg-red-500"; // Vermelho se algum pagamento estiver atrasado
    if (hasPendente) return "bg-orange-500"; // Laranja se algum pagamento estiver pendente
    if (allPago) return "bg-green-500"; // Verde se todos os pagamentos estiverem pagos

    return "bg-gray-300"; // Cor padrão para outros casos
  };

  if (loading) {
    return (
      <div className="flex flex-row min-h-screen items-center text-white justify-center w-full bg-white">
        <h1 className="font-bold text-2xl">Carregando informações....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-row min-h-screen items-center text-white justify-center w-full bg-white">
        <h1 className="font-bold text-2xl">{error}</h1>
      </div>
    );
  }

  if (!condominio) {
    return <p>Condomínio não encontrado.</p>;
  }

  return (
    <>
      <NavbarDashboardAdm />
      <div className="p-4 min-h-screen flex flex-col items-center">
        {/* Informações do Condomínio */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            {condominio.nome}
          </h1>
          <p className="text-md md:text-lg text-center mt-2">
            {condominio.endereco}
          </p>
        </div>

        {/* Unidades */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Unidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {condominio.unidades.map((unidade) => (
              <Link
                key={unidade.id}
                className={`border rounded-lg p-4 shadow-sm ${getStatusColor(
                  unidade.pagamentos
                )}`}
                href={`/dashboard/adm/controle/unidade/${unidade.id}`}
              >
                <p className="font-semibold">Número: {unidade.numero}</p>
                <p>Descrição: {unidade.descricao}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Feedbacks */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
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

        {/* Manutenções */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
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

        {/* Administradores */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
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
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
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
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
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
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
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

        {/* Formulário para criar registro na tabela UsuarioUnidade */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Adicionar Usuário à Unidade
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              handleCreateUsuarioUnidade(formData);
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              name="emailUsuario"
              placeholder="Email do usuário"
              className="border rounded-lg p-2"
              required
            />
            <input
              type="text"
              name="unidadeNome"
              placeholder="Nome da unidade"
              className="border rounded-lg p-2"
              required
            />
            <select
              name="papel"
              className="border rounded-lg p-2"
              defaultValue="MORADOR"
            >
              <option value="MORADOR">Morador</option>
              <option value="OPERADOR">Operador</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 max-w-fit"
            >
              Adicionar
            </button>
          </form>
        </div>

        {/* Formulário para adicionar pagamentos */}
        <div className="mt-8 w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Adicionar Pagamento
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              formData.append("condominioId", condominio.id); // Adiciona o ID do condomínio
              handleAddPagamento(formData);
            }}
            className="flex flex-col gap-4"
          >
            <select
              name="unidadeNome"
              className="border rounded-lg p-2"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Selecione uma unidade
              </option>
              {condominio.unidades.map((unidade) => (
                <option key={unidade.id} value={unidade.numero}>
                  {unidade.numero} - {unidade.descricao}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="valor"
              placeholder="Valor do pagamento"
              className="border rounded-lg p-2"
              required
            />
            <input
              type="date"
              name="dataVencimento"
              className="border rounded-lg p-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Adicionar Pagamento
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
