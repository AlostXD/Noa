"use client";

import NavbarDashboard from "@/app/components/navbarDashboard";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      <NavbarDashboard />
      <div className="flex flex-col lg:flex-row items-center justify-center p-4">
        <nav className="flex flex-row lg:flex-col justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8 list-none">
          <li>
            <button
              onClick={() => setFunc("VerPosts")}
              className={`flex w-full h-[47px] items-center gap-3.5 px-3 rounded-[10px] transition duration-500 ease-in-out ${
                func === "VerPosts"
                  ? "bg-[#d9eaf7] text-white"
                  : "hover:bg-sky-800 hover:text-white"
              }`}
            >
              Ver postagens
            </button>
          </li>
          <li>
            <button
              onClick={() => setFunc("CriarPosts")}
              className={`flex w-full h-[47px] items-center gap-3.5 px-3 rounded-[10px] transition duration-500 ease-in-out ${
                func === "CriarPosts"
                  ? "bg-[#d9eaf7] text-white"
                  : "hover:bg-sky-800 hover:text-white"
              }`}
            >
              Criar uma postagem
            </button>
          </li>
        </nav>

        {func === "VerPosts" && (
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8">
            <h1 className="text-2xl font-bold mb-4">Selecione um condomínio</h1>
            <select
              value={selectedCondominio}
              onChange={(e) => setSelectedCondominio(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full max-w-[400px]"
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
            {selectedCondominio && (
              <div className="mt-8 w-full">
                <h2 className="text-xl font-bold mb-4">
                  Feedbacks do Condomínio
                </h2>
                {feedbacks.length > 0 ? (
                  <div className="space-y-4">
                    {feedbacks.map((feedback) => (
                      <div
                        key={feedback.id}
                        className="border rounded-lg p-4 shadow-sm"
                      >
                        <h3 className="font-semibold text-lg">
                          {feedback.titulo}
                        </h3>
                        <p className="text-gray-600">{feedback.conteudo}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Autor: {feedback.autor.nome}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Nenhum feedback encontrado.</p>
                )}
              </div>
            )}
          </div>
        )}

        {func === "CriarPosts" && (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Fórum</h1>
            <p className="text-gray-600">O local para você ser ouvido</p>

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
              className="flex flex-col gap-[29px] mb-[30px]"
            >
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                className="border border-gray-300 rounded px-4 py-2"
                required
              />
              <textarea
                name="conteudo"
                placeholder="Conteúdo"
                className="border border-gray-300 rounded px-4 py-2"
                rows={5}
                required
              ></textarea>
              <select
                name="condominioId"
                className="border border-gray-300 rounded px-4 py-2"
                defaultValue=""
                required
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
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Enviar
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
