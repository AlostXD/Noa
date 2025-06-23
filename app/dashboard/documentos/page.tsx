"use client"

import React from 'react'
import NavbarDashboard from "@/app/components/navbarDashboard"

export default function Documentos() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarDashboard />
      <div className="flex-1 pt-18 pb-18 px-12 2xl:px-[198px] flex flex-col ">
        {/* Cabeçalho centralizado */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-black">Documentos</h1>
          <p className="text-sm text-gray-500 text-center">
            Tudo que você precisa saber sobre o condomínio, em um só lugar.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 font-normal">
          <div className="bg-[#015388] text-white rounded-4xl  pt-6 pb-6 px-6 lg:px-9 flex-1">
            <h2 className="font-extrabold text-xl mb-2">Consulta Rápida</h2>
            <p className="text-sm">
              Visualize e baixe facilmente documentos oficiais como atas, relatórios e comunicados. Mantenha-se informado e participe ativamente.
            </p>
         </div>
         <div className="bg-[#015388] text-white rounded-4xl pt-6 pb-6 px-6 lg:px-9 flex-1">
          <h2 className="font-extrabold text-xl mb-2">Transparência e Gestão</h2>
          <p className="text-sm">
            Tenha acesso a relatórios financeiros e informações operacionais que demonstram nosso compromisso com a clareza e a participação de todos.
          </p>
       </div>
     </div>



        <div className="mt-12 text-lg font-semibold">
          Documentos
        </div>

        <div className="flex-1 w-full max-w-full mx-auto flex flex-col">
          <div className="bg-[#015388] text-white p-4 rounded-t-2xl border border-gray-300 border-b-0 flex justify-between">
            <span className="font-medium">Nome</span>
            <span className="font-medium">Ações</span>
          </div>
          <div className="flex-1 bg-white p-4 rounded-b-2xl border border-gray-300 border-t-0 overflow-auto">

          </div>
        </div>
      </div>
    </div>
  )
}
