"use client";

import NavbarDashboard from '@/app/components/navbarDashboard'
import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function CadastrosGerais() {
    const [func, setFunc] = useState("Criar");
  return (
    <>
        <NavbarDashboard />
        <div className="flex flex-col lg:flex-row items-center justify-center p-4">
            <nav className='flex flex-row lg:flex-col justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8 list-none'>
                <li><button onClick={() => setFunc("CriarC")}>Criar Condomínio</button></li>
                <li><button onClick={() => setFunc("CriarC")}>Criar Unidade</button></li>
                <li><button onClick={() => setFunc("Editar")}>Editar</button></li>
                <li><button onClick={() => setFunc("Transferir")}>Transferir</button></li>
                <li><button onClick={() => setFunc("Acessar")}>Acessar</button></li>
            </nav>
            {func === "CriarC" && (
                <div className='flex flex-col items-center justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                    <form action={
                        async (formData: FormData) => {
                        const response = await fetch('/api/registercondominio', {
                            method: 'POST',
                            body: formData,
                        });

                        if (!response.ok) {
                        const errorData = await response.json();
                        toast.error(errorData.error);
                        return;
                        }

                        const result = await response.json();
                        toast.success(result.message);
                        console.log('Condomínio cadastrado com sucesso:', result);
                        }
                    }>
                        <label htmlFor="name">Nome do condomínio</label>
                        <input type="text" name="name" placeholder='Nome do condomínio' className='border border-gray-300 rounded p-2 w-full' />
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" name="endereco" placeholder='Endereço do condomínio' className='border border-gray-300 rounded p-2 w-full' />
                        <button type="submit">Cadastrar Condomínio</button>
                    </form>
                </div>
            )}
            
            {func === "CriarU" && (
                <div className='flex flex-col items-center justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                    <form action={
                        async (formData: FormData) => {
                        const response = await fetch('/api/registercondominio', {
                            method: 'POST',
                            body: formData,
                        });

                        if (!response.ok) {
                        const errorData = await response.json();
                        toast.error(errorData.error);
                        return;
                        }

                        const result = await response.json();
                        toast.success(result.message);
                        console.log('Condomínio cadastrado com sucesso:', result);
                        }
                    }>
                        <label htmlFor="name">Nome do condomínio</label>
                        <input type="text" name="name" placeholder='Nome do condomínio' className='border border-gray-300 rounded p-2 w-full' />
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" name="endereco" placeholder='Endereço do condomínio' className='border border-gray-300 rounded p-2 w-full' />
                        <button type="submit">Cadastrar Condomínio</button>
                    </form>
                </div>
            )}

            {func === "Editar" && (
                <div className='flex flex-col items-center justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                    <h1 className='text-2xl font-bold'>Editar Cadastro</h1>
                    <p>Formulário para editar um cadastro existente.</p>
                </div>
            )}
            {func === "Transferir" && (
                <div className='flex flex-col items-center justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                    <h1 className='text-2xl font-bold'>Transferir Cadastro</h1>
                    <p>Formulário para transferir um cadastro.</p>
                </div>
            )}
            {func === "Acessar" && (
                <div className='flex flex-col items-center justify-center gap-4 w-full max-w-[700px] lg:max-w-[1330px] mt-8'>
                    <h1 className='text-2xl font-bold'>Acessar Cadastro</h1>
                    <p>Formulário para acessar um cadastro existente.</p>
                </div>
            )}
        </div>
        </>
  )
}