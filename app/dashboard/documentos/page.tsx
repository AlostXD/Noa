"use client"

import React from 'react'
import NavbarDashboard from "../../components/navbarDashboard"

export default function Documentos() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarDashboard />
      <div className="flex-1 p-4">
 
        <div className="flex flex-col items-center justify-center space-y-2 mb-6">
          <h1 className="text-4xl font-bold text-black">Documentos</h1>
          <p className="text-sm text-gray-500 text-center">
            Tudo que você precisa saber sobre o condomínio, em um só lugar.
          </p>
        </div>

        <div className="space-y-4 sm:flex sm:space-x-4 sm:space-y-0 mb-6">
          <div className="bg-blue-800 text-white rounded-xl p-4 w-full sm:w-1/2">
            <h2 className="font-semibold">Consulta Rápida</h2>
            <p className="text-sm">
              Visualize e baixe facilmente documentos oficiais como atas, relatórios e comunicados. Mantenha-se informado e participe ativamente..
            </p>
          </div>
          <div className="bg-blue-800 text-white rounded-xl p-4 w-full sm:w-1/2">
            <h2 className="font-semibold">Transparência e Gestão</h2>
            <p className="text-sm">
              Tenha acesso a relatórios financeiros e informações operacionais que demonstram nosso compromisso com a clareza e a participação de todos.
            </p>
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold">
          Documentos
        </div>
        <div className="bg-blue-800 text-white rounded-t-2xl p-4 w-full border border-gray-300 border-b-0">
          <div className="flex justify-between">
            <span className="font-medium">Nome</span>
            <span className="font-medium">Ações</span>
          </div>
        </div>

        <div className="mt-0 bg-white rounded-b-2xl p-4 border border-gray-300 border-t-0 w-full">
      </div>
      </div>
    </div>
  )
}
