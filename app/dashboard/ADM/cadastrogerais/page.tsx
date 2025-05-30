"use client";

import NavbarDashboard from '@/app/components/navbarDashboard'
import React from 'react'
import { useState } from 'react'

export default function CadastrosGerais() {
    const [func, setFunc] = useState("Criar");
  return (
    <>
        <NavbarDashboard />
        <nav className='flex flex-col items-start gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8 min-h-screen'>
            <li><button onClick={() => setFunc("Criar")}>Criar</button></li>
            <li><button onClick={() => setFunc("Editar")}>Editar</button></li>
            <li><button onClick={() => setFunc("Transferir")}>Transferir</button></li>
            <li><button onClick={() => setFunc("Acessar")}>Acessar</button></li>
        </nav>
        {func === "Criar" && (
            <div className='flex flex-col items-start gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                <h1 className='text-2xl font-bold'>Criar Cadastro</h1>
                <p>Formulário para criar um novo cadastro.</p>
            </div>
        )}

        {func === "Editar" && (
            <div className='flex flex-col items-start gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                <h1 className='text-2xl font-bold'>Editar Cadastro</h1>
                <p>Formulário para editar um cadastro existente.</p>
            </div>
        )}
        {func === "Transferir" && (
            <div className='flex flex-col items-start gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                <h1 className='text-2xl font-bold'>Transferir Cadastro</h1>
                <p>Formulário para transferir um cadastro.</p>
            </div>
        )}
        {func === "Acessar" && (
            <div className='flex flex-col items-start gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                <h1 className='text-2xl font-bold'>Acessar Cadastro</h1>
                <p>Formulário para acessar um cadastro existente.</p>
            </div>
        )}
    </>
  )
}