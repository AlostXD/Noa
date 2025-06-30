"use client";

import React from "react";
import NavbarDashboard from "@/app/components/navbarDashboard";
import Image from "next/image";

export default function Documentos() {
  return (
    <>
      <NavbarDashboard />
      <div className="bg-white flex flex-col w-full min-h-screen px-6 2xl:px-[198px] py-8">
        <div className="flex-1 p-6 flex flex-col space-y-6">
          {/* Título da página */}
          <div className="flex flex-col items-center font-poppins">
            <h1 className="text-2xl font-semibold text-gray-900">Documentos</h1>
            <p className="text-sm text-gray-500 text-center mt-2">
              Veja todos os arquivos e registros do condomínio de forma clara
            </p>
          </div>

          {/* Destaques: tipos de documentos */}
          <div className="text-lg font-semibold">Categorias disponíveis</div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Comunicados */}
            <div className="flex-1 bg-slate-100 bg-opacity-10 border-l-4 border-[#015388] p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#015388] rounded-full flex items-center justify-center">
                  <Image
                    src="/login/comu.png"
                    alt="Comunicados"
                    width={24}
                    height={24}
                    objectFit="contain"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-[#015388]">
                    Comunicados
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fique por dentro dos avisos e informes da administração
                  </p>
                </div>
              </div>
            </div>

            {/* Atas e Reuniões */}
            <div className="flex-1 bg-slate-100 bg-opacity-10  border-l-4 border-[#015388] p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#015388] rounded-full flex items-center justify-center">
                  <Image
                    src="/login/atas.png"
                    alt="Atas e reuniões"
                    width={24}
                    height={24}
                    objectFit="contain"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-[#015388]">
                    Atas e Reuniões
                  </h2>
                  <p className="text-sm text-gray-500">
                    Consulte registros formais das reuniões realizadas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Documentos Listados */}
          <div className="mt-6 text-lg font-semibold">Arquivos disponíveis</div>
          <div className="bg-white px-4 md:px-8 py-4 rounded-2xl border border-gray-300 shadow-lg min-h-[300px] overflow-y-auto">
            {/* Cabeçalho */}
            <div className="grid grid-cols-2 text-sm font-medium text-gray-600 border-b border-gray-200 pb-2">
              <div className=" pl-4">Nome</div>
              <div className="text-right pr-8">Ações</div>
            </div>

            {/* Lista vazia temporária */}
            <div className="text-sm text-gray-500 text-center py-12 col-span-2">
              Nenhum documento disponível no momento.
              <br />
              Verifique novamente mais tarde ou entre em contato com o
              administrador.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
