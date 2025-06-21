"use client"

import NavbarDashboardAdm from "@/app/components/navbarDashboardAdm";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function CadastrosGerais() {
  const [func, setFunc] = useState("Criar");

  return (
    <>
      <NavbarDashboardAdm />
      <div className="bg-[#f1f5ff] flex flex-col w-full min-h-screen 2xl:px-[198px]">
        {/* Main */}
        <div className="flex flex-col md:flex-row flex-1 w-full px-4 py-[50px]">
          {/* Esquerda - Buttons Navegação */}
          <nav className="w-full md:w-[250px] lg:w-[300px] p-4 md:py-8">
            <div className="flex flex-col gap-4 w-full text-[#061e3e] text-base font-poppins font-semibold">
              <button
                onClick={() => setFunc("CriarC")}
                className={`flex w-full h-[47px] items-center gap-3.5 px-3 rounded-[10px] cursor-pointer transition duration-500 ease-in-out ${
                  func === "CriarC"
                    ? "bg-[#005e971a] text-[#12266a]"
                    : "hover:bg-sky-800 hover:text-white"
                }`}
              >
                <Image
                  alt="Ícone"
                  src="/Login/adm/criarC.svg"
                  width={15}
                  height={15}
                />
                Criar condomínio
              </button>

              <hr className="w-full h-0.5 bg-white border-none" />

              <button
                onClick={() => setFunc("CriarU")}
                className={`flex w-full h-[47px] items-center gap-3.5 px-3 rounded-[10px] cursor-pointer transition duration-500 ease-in-out ${
                  func === "CriarU"
                    ? "bg-[#005e971a] text-[#12266a]"
                    : "hover:bg-sky-800 hover:text-white"
                }`}
              >
                <Image
                  alt="Ícone"
                  src="/Login/adm/criarU.svg"
                  width={17}
                  height={16}
                />
                Criar Unidade
              </button>

              <hr className="w-full h-0.5 bg-white border-none" />

              <button
                onClick={() => setFunc("CriarT")}
                className={`flex w-full h-[47px] items-center gap-3.5 px-3 rounded-[10px] cursor-pointer transition duration-500 ease-in-out ${
                  func === "CriarT"
                    ? "bg-[#005e971a] text-[#12266a]"
                    : "hover:bg-sky-800 hover:text-white"
                }`}
              >
                <Image
                  alt="Ícone"
                  src="/Login/adm/transferir.svg"
                  width={14}
                  height={17}
                />
                Transferir
              </button>

              <hr className="w-full h-0.5 bg-white border-none" />
            </div>
          </nav>

          {/* Quadrado */}
          <div className="flex-1 relative py-12 px-4">
            <div className="absolute inset-0">
              <div className="w-full h-[calc(100%-50px)] object-cover bg-white rounded-[20px]"></div>
            </div>
            <div className="flex flex-col md:flex-row relative z-10 h-full justify-center">
              
              {/* Centro - Form */}
              <div className="w-full md:w-1/2 flex justify-center md:py-0">
                <div className="w-full max-w-[382px] font-poppins text-center">
                  {func === "Criar" && (
                    <h1 className="font-bold text-[#12266a] text-2xl mb-4">
                      Cadastros Gerais
                    </h1>
                  )}
                  {func === "CriarC" && (
                    <>
                      <div className="font-bold text-[#12266a] text-2xl mb-4">
                        Cadastrar novo condomínio
                        <p className="font-light text-[#5a5a5a] text-sm mb-8">
                          Registre os condomínios que estão sob sua
                          responsabilidade
                        </p>
                      </div>

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
                          console.log(
                            "Condomínio cadastrado com sucesso:",
                            result
                          );
                        }}
                        className="flex flex-col gap-[29px] mb-[30px]"
                      >
                        <input
                          name="name"
                          placeholder="Nome do condomínio"
                          className="w-full h-[59px] pl-5 pr-[35px] py-5 bg-[#f1f5ff] rounded-[10px] font-light text-[#00000080] text-base border border-transparent focus:border-blue-800 focus:outline-none transition duration-400"
                          type="text"
                        />
                        <input
                          name="endereco"
                          placeholder="Endereço do condomínio"
                          className="w-full h-[59px] pl-5 pr-[35px] py-5 bg-[#f1f5ff] rounded-[10px] font-light text-[#00000080] text-base border border-transparent focus:border-blue-800 focus:outline-none transition duration-400"
                          type="text"
                        />
                        <button
                          type="submit"
                          className="all-[unset] box-border flex w-full h-[55px] items-center justify-center gap-2.5 px-5 py-[15px] bg-[#12266a] rounded-[10px] shadow-[0px_10px_20px_#cad6ff] hover:bg-blue-900 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110"
                        >
                          <div className="[font-family:'Poppins',Helvetica] font-semibold text-white text-xl text-center">
                            Cadastrar
                          </div>
                        </button>
                      </form>
                    </>
                  )}

                  {func === "CriarU" && (
                    <>
                      <div className="font-bold text-[#12266a] text-2xl  mb-4">
                        Cadastrar nova unidade
                        <p className="font-light text-[#5a5a5a] text-sm mb-8">
                          Registre as unidades associadas aos condomínios
                        </p>
                      </div>
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
                          console.log(
                            "Unidade cadastrada com sucesso:",
                            result
                          );
                        }}
                        className="flex flex-col gap-[29px] mb-[30px]"
                      >
                        <input
                          name="number"
                          placeholder="Número da unidade"
                          className="w-full h-[59px] pl-5 pr-[35px] py-5 bg-[#f1f5ff] rounded-[10px] font-light text-[#00000080] text-base border border-transparent focus:border-blue-800 focus:outline-none transition duration-400"
                          type="text"
                        />
                        <input
                          name="descricao"
                          placeholder="Descrição"
                          className="w-full h-[59px] pl-5 pr-[35px] py-5 bg-[#f1f5ff] rounded-[10px] font-light text-[#00000080] text-base border border-transparent focus:border-blue-800 focus:outline-none transition duration-400"
                          type="text"
                        />
                        <input
                          name="condominionome"
                          placeholder="Condomínio relacionado"
                          className="w-full h-[59px] pl-5 pr-[35px] py-5 bg-[#f1f5ff] rounded-[10px] font-light text-[#00000080] text-base border border-transparent focus:border-blue-800 focus:outline-none transition duration-400"
                          type="text"
                        />
                        <button
                          type="submit"
                          className="all-[unset] box-border flex w-full h-[55px] items-center justify-center gap-2.5 px-5 py-[15px] bg-[#12266a] rounded-[10px] shadow-[0px_10px_20px_#cad6ff] hover:bg-blue-900 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110"
                        >
                          <div className="font-semibold text-white text-xl text-center">
                            Cadastrar
                          </div>
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* Direita - Imagem */}
              <div className="block md:hidden lg:block  w-full md:w-1/4 flex justify-end py-8 md:py-0">
                <Image
                  className="object-contain"
                  alt="Homem"
                  src="/Login/adm/homem.svg"
                  width={297}
                  height={302}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

