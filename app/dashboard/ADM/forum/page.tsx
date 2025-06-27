"use client";

import NavbarDashboardAdm from "@/app/components/navbarDashboardAdm";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CadastrosGerais() {
  const [func, setFunc] = useState("VerPosts");
  const [condominios, setCondominios] = useState<
    { id: string; nome: string }[]
  >([]);
  const [selectedCondominio, setSelectedCondominio] = useState<string>("");
  const [feedbacks, setFeedbacks] = useState<
    { id: string; titulo: string; conteudo: string; autor: { nome: string } }[]
  >([]);

  useEffect(() => {
    const fetchCondominios = async () => {
      try {
        const response = await fetch("/api/condominio", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar os condomínios");
        }
        const result = await response.json();
        setCondominios(result); // Define os condomínios no estado
      } catch (error) {
        console.error("Erro ao buscar os condomínios:", error);
        toast.error("Erro ao buscar os condomínios.");
      }
    };

    fetchCondominios();
  }, []);

  useEffect(() => {
    if (selectedCondominio) {
      const fetchFeedbacks = async () => {
        try {
          const response = await fetch(
            `/api/forum/condominioForum?condominioId=${selectedCondominio}`,
            {
              method: "GET",
            }
          );
          if (!response.ok) {
            throw new Error("Erro ao buscar os feedbacks");
          }
          const result = await response.json();
          setFeedbacks(result.message); // Define os feedbacks no estado
        } catch (error) {
          console.error("Erro ao buscar os feedbacks:", error);
          toast.error("Erro ao buscar os feedbacks.");
        }
      };

      fetchFeedbacks();
    }
  }, [selectedCondominio]);

  return (
    <>
      <NavbarDashboardAdm />
      <div className="bg-white flex flex-col w-full min-h-screen px-6 2xl:px-[198px] py-8">
        <div className="p-4 flex flex-col gap-6">
          {/* Cabeçalho com botões ao lado direito */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-black">Fórum</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setFunc("VerPosts")}
                className={`px-6 py-3 rounded-3xl font-semibold text-white transition-all ${
                  func === "VerPosts"
                    ? "bg-white !text-[#015388] border-2 border-[#015388] shadow-md"
                    : "bg-[#015388] text-white hover:bg-[#01416b]"
                }`}
              >
                Ver postagens
              </button>
              <button
                onClick={() => setFunc("CriarPosts")}
                className={`flex items-center gap-2 px-4 py-3 rounded-3xl font-semibold text-white transition-all ${
                  func === "CriarPosts"
                    ? "bg-white !text-[#015388] border-2 border-[#015388] shadow-md"
                    : "bg-[#015388] text-white hover:bg-[#01416b]"
                }`}
              >
                <Image
                  src="/mais.png"
                  alt="ícone de mais"
                  width={20}
                  height={20}
                />
                <span>Nova postagem</span>
              </button>
            </div>
          </div>

          {/* Ver Postagens */}
          {func === "VerPosts" && (
            <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[1330px] mt-8">
              <h2 className="text-2xl font-bold mb-4">
                Selecione um condomínio
              </h2>
              <select
                value={selectedCondominio}
                onChange={(e) => setSelectedCondominio(e.target.value)}
                className="w-full max-w-[450px] px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 
                          hover:border-[#015388] hover:shadow-md transition duration-200 ease-in-out 
                          outline-none focus:outline-none"
              >
                <option value="" disabled>
                  Escolha um condomínio
                </option>
                {condominios.map((condominio) => (
                  <option key={condominio.id} value={condominio.id}>
                    {condominio.nome}
                  </option>
                ))}
              </select>

              {/* Tabela de feedbacks */}
              <div className="flex-1 w-full max-w-full mx-auto flex flex-col mt-6">
                <div className="w-full relative mt-4">
                  <h3 className="bg-[#F1F6FF] p-4 md:px-6 py-2 md:py-3 rounded-t-2xl font-bold text-center w-fit mr-4 mb-1 z-10 relative">
                    Postagens
                  </h3>
                  <div className="bg-[#F1F6FF] min-h-[400px] p-6 rounded-b-2xl rounded-r-2xl space-y-4">
                    {selectedCondominio ? (
                      feedbacks.length > 0 ? (
                        feedbacks.map((feedback) => (
                          <div
                            key={feedback.id}
                            className="bg-white rounded-lg p-4 shadow-md flex flex-col"
                          >
                            <div>
                              <h4 className="font-semibold text-lg">
                                {feedback.titulo}
                              </h4>
                              <p className="text-gray-600">
                                {feedback.conteudo}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 text-right">
                              Autor: {feedback.autor.nome}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">
                          Nenhum feedback encontrado.
                        </p>
                      )
                    ) : (
                      <p className="text-gray-500 italic">
                        Selecione um condomínio para ver os feedbacks.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}


          {func === "CriarPosts" && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold mb-4">Queremos te ouvir!</h1>
              <p className="text-gray-600">
                Compartilhe sugestões, dúvidas ou reclamações
              </p>

              <form
                action={async (formData: FormData) => {
                  const response = await fetch("/api/forum", {
                    method: "POST",
                    body: formData,
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(errorData.error);
                    return;
                  }

                  const result = await response.json();
                  toast.success(result.message);
                  console.log("Feedback cadastrado com sucesso:", result);
                }}
                className="w-full max-w-[600px] bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6 mt-6"
              >
                <input
                  type="text"
                  name="titulo"
                  placeholder="Título"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none hover:border-[#015388]  transition"
                  required
                />
                <textarea
                  name="conteudo"
                  placeholder="Conteúdo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none hover:border-[#015388] transition"
                  rows={5}
                  required
                ></textarea>
                <select
                  name="condominioId"
                  defaultValue=""
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:border-[#015388]  transition"
                >
                  <option value="" disabled>
                    Selecione um condomínio
                  </option>
                  {condominios.map((condominio) => (
                    <option key={condominio.id} value={condominio.id}>
                      {condominio.nome}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full bg-[#015388] hover:bg-[#01416b] text-white font-semibold px-4 py-3 rounded-xl transition"
                >
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
