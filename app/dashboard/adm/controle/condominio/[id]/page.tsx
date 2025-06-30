"use client";

import { useParams } from "next/navigation"; // Use `useParams` para capturar o ID
import React, { useEffect, useState } from "react";
import NavbarDashboardAdm from "@/app/components/navbarDashboardAdm";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

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

  const [formAtivo, setFormAtivo] = useState("info");

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
      <div className="bg-[#f1f5ff] flex flex-col w-full min-h-screen 2xl:px-[198px]">
        <div className="flex flex-col md:flex-row flex-1 w-full px-4 py-12 gap-6">
          <div className="flex flex-col md:flex-row w-full px-4 py-12 gap-6">

            <aside className="w-full md:w-[250px] lg:w-[280px] bg-white rounded-2xl shadow-md p-6 space-y-2">
              <h2 className="text-[#12266a] font-bold text-lg mb-4">Menu</h2>
              <div className="flex flex-col gap-2 font-medium text-sm text-[#061e3e] divide-y divide-gray-200">
                {/* Info */}
                <button
                  onClick={() => setFormAtivo("info")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition ${
                    formAtivo === "info"
                      ? "bg-[#005e971a]  text-[#12266a] font-semibold"
                      : "hover:bg-[#e8f0fe]"
                  }`}
                >
                  Informações do condomínio
                </button>

                {/* Editar */}
                <button
                  onClick={() => setFormAtivo("editar")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    formAtivo === "editar"
                      ? "bg-[#005e971a]  text-[#12266a] font-semibold"
                      : "hover:bg-[#e8f0fe]"
                  }`}
                >
                  Editar Informações
                </button>

                {/* Remover */}
                <button
                  onClick={() => setFormAtivo("remover")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    formAtivo === "remover"
                      ? "bg-[#005e971a] text-[#12266a]font-semibold"
                      : "hover:bg-[#e8f0fe]"
                  }`}
                >
                  Remover Unidade
                </button>

                {/* Transferir */}
                <button
                  onClick={() => setFormAtivo("transferir")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    formAtivo === "transferir"
                      ? "bg-[#005e971a]  text-[#12266a] font-semibold"
                      : "hover:bg-[#e8f0fe]"
                  }`}
                >
                  Transferir Unidade
                </button>

                {/* Usuário */}
                <button
                  onClick={() => setFormAtivo("usuario")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    formAtivo === "usuario"
                      ? "bg-[#005e971a] text-[#12266a] font-semibold"
                      : "hover:bg-[#e8f0fe]"
                  }`}
                >
                  Adicionar Usuário
                </button>

                {/* Pagamento */}
                <button
                  onClick={() => setFormAtivo("pagamento")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    formAtivo === "pagamento"
                      ? "bg-[#005e971a] text-[#12266a] font-semibold"
                      : "hover:bg-[#e8f0fe]"
                  }`}
                >
                  Adicionar Pagamento
                </button>
              </div>
            </aside>

            {/* Card branco com todas as informações */}
            <div className="flex-1 bg-white shadow-lg rounded-[20px] p-6 md:p-10 space-y-8 overflow-hidden">
              {/* Informações do condomínio */}
              {formAtivo === "info" && (
                <>
                  <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-center text-[#12266a]">
                      {condominio.nome}
                    </h1>
                    <p className="text-md md:text-lg text-center mt-2 text-gray-600">
                      {condominio.endereco}
                    </p>
                  </div>

                  {/* Unidades */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#12266a]">
                      Unidades
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {condominio.unidades.map((unidade) => (
                        <Link
                          key={unidade.id}
                          className={`bg-white border border-gray-200 hover:border-[#015388] rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md ${getStatusColor(
                            unidade.pagamentos
                          )}`}
                          href={`/dashboard/adm/controle/unidade/${unidade.id}`}
                        >
                          <p className="font-semibold">
                            Número: {unidade.numero}
                          </p>
                          <p>Descrição: {unidade.descricao}</p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Feedbacks */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                      Feedbacks
                    </h2>
                    <div className="space-y-4">
                      {condominio.feedbacks.map((feedback) => (
                        <div
                          key={feedback.id}
                          className="bg-white border border-gray-200 hover:border-[#015388] rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md"
                        >
                          <p>{feedback.mensagem}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Manutenções */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                      Manutenções
                    </h2>
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
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">
                      Administradores
                    </h2>
                    <div className="space-y-4">
                      {condominio.Admin.map((admin) => (
                        <div
                          key={admin.id}
                          className="border rounded-lg p-4 shadow-sm"
                        >
                          <p className="font-semibold">
                            Nome: {admin.usuario.nome}
                          </p>
                          <p>Email: {admin.usuario.email}</p>
                          <p>CPF: {admin.usuario.cpf}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Aqui você pode incluir também os formulários condicionais do tipo: if (formAtivo === 'editar') ... */}

              {formAtivo === "editar" && (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4">Editar Informações</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(
                        e.target as HTMLFormElement
                      );
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

                    <label
                      htmlFor="endereco"
                      className="block mb-2 font-semibold"
                    >
                      Endereço do condomínio
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      defaultValue={condominio.endereco}
                      className="border border-gray-300 rounded p-2 w-full mb-4"
                    />

                    <label
                      htmlFor="adminEmail"
                      className="block mb-2 font-semibold"
                    >
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
              )}
              {formAtivo === "remover" && (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4">Remover Unidade</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(
                        e.target as HTMLFormElement
                      );
                      formData.append("condominioId", condominio.id);
                      handleRemoveUnidade(formData);
                    }}
                  >
                    <label
                      htmlFor="unidadeNome"
                      className="block mb-2 font-semibold"
                    >
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
              )}

              {formAtivo === "transferir" && (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4">Transferir Unidade</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(
                        e.target as HTMLFormElement
                      );
                      formData.append("condominioId", condominio.id);
                      handleTransferUnidade(formData);
                    }}
                  >
                    <label
                      htmlFor="unidadeNome"
                      className="block mb-2 font-semibold"
                    >
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
              )}

              {formAtivo === "usuario" && (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4">
                    Adicionar Usuário à Unidade
                  </h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(
                        e.target as HTMLFormElement
                      );
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
              )}

              {formAtivo === "pagamento" && (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-bold mb-4">
                    Adicionar Pagamento
                  </h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(
                        e.target as HTMLFormElement
                      );
                      formData.append("condominioId", condominio.id);
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
