

"use client";

import NavbarDashboard from "@/app/components/navbarDashboard";
import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CadastrosGerais() {
  const [func, setFunc] = useState("Criar");

  return (
    <>
      <NavbarDashboard />
      <div className="flex flex-col lg:flex-row items-center justify-center p-4">
        <nav className="flex flex-row lg:flex-col justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8 list-none">
          <li>
            <button 
              onClick={() => setFunc("CriarC")}
              className={`flex w-full h-[47px] items-center gap-3.5 px-3 rounded-[10px] transition duration-500 ease-in-out ${
                func === "CriarC"
                  ? "bg-[#d9eaf7] text-white"
                  : "hover:bg-sky-800 hover:text-white"
              }`}
            >Criar Condomínio
            </button>
          </li>
          <li>
            <button onClick={() => setFunc("CriarU")}>Criar Unidade</button>
          </li>
        </nav>
        {func === "CriarC" && (
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8">
            <form
              action={async (formData: FormData) => {
                const response = await fetch("/api/condominio", {
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
                console.log("Condomínio cadastrado com sucesso:", result);
              }}
            >
              <label htmlFor="name">Nome do condomínio</label>
              <input
                type="text"
                name="name"
                placeholder="Nome do condomínio"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                name="endereco"
                placeholder="Endereço do condomínio"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <button type="submit">Cadastrar Condomínio</button>
            </form>
          </div>
        )}

        {func === "CriarU" && (
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8">
            <form
              action={async (formData: FormData) => {
                const response = await fetch("/api/unidade", {
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
                console.log("Unidade cadastrada com sucesso:", result);
              }}
            >
              <label htmlFor="number">Número da unidade</label>
              <input
                type="text"
                name="number"
                placeholder="Digite o número da unidade"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <label htmlFor="descricao">Descrição da unidade</label>
              <input
                type="text"
                name="descricao"
                placeholder="Descrição da unidade"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <label htmlFor="condominionome">
                Nome do condomínio relacionado
              </label>
              <input
                type="text"
                name="condominionome"
                placeholder="Nome do condomínio"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <button type="submit">Cadastrar Unidade</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
