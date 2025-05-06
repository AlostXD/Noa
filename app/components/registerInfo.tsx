"use client";

import { verifyCpf } from '@/lib/verify-cpf';
import React from 'react'
import toast from 'react-hot-toast';


export default function registerInfo() {


  return (
  <form action={
    async (formData: FormData) => {
    const response = await fetch('/api/account/registerinformation', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        toast.error('Erro ao atualizar os dados. Este CPF já existe. Caso você não tenha certeza, entre em contato com o suporte.');
        return;
    }

    const result = await response.json();
        toast.success('Dados atualizados com sucesso!');
        console.log('User information updated successfully:', result);
    }
  }
  className='text-center'
  >
    <li className="list-none flex flex-col text-t2">
      <label htmlFor="name">Nome</label>
      <input type="text" id="name" name="name" className="border rounded-md p-2 mb-4" placeholder="Nome" required />
    </li>
    <li className="list-none flex flex-col text-t2">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" className="border rounded-md p-2 mb-4" placeholder="Email" required />
    </li>
    <li className="list-none flex flex-col text-t2">
      <label htmlFor="cpf">CPF</label>
      <input type="text" id="cpf" name="cpf" className="border rounded-md p-2 mb-4" placeholder="CPF" required/>
    </li>
    <li className="list-none flex flex-col text-t2">
      <label htmlFor="endereco">Endereço</label>
      <input type="text" id="endereco" name="endereco" className='border rounded-md p-2 mb-4' placeholder='Endereço' required/>
    </li>
    <li className="list-none flex flex-col text-t2">
      <label htmlFor="date">Data de Nascimento</label>
      <input type="date" id="date" name="date" className='border rounded-md p-2 mb-4' placeholder='Data de Nascimento' required/>
    </li>
    <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Atualizar</button>
  </form>
  )
}