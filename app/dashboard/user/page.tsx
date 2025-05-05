import React from 'react'
import UserProfileLayout from '@/app/components/userProfileLayout'
import NavbarDashboard from '@/app/components/navbarDashboard'
import LogoutButton from '@/app/components/sign-out'
import prisma from '@/lib/prisma'



export default async function userPage() {
  async function registerUserData() {
    const formData = new FormData(event.target as HTMLFormElement);
    const nome = formData.get("name") as string;
    const email = formData.get("email") as string;
    const cpf = formData.get("cpf") as string;
    const endereco = formData.get("endereco") as string;
    const date = formData.get("date") as string;

    try {
      await prisma.usuario.create({
        data: {
          nome,
          cpf,
          endereco,
          date,
        },
      });
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar os dados.");
    }
  }

  return (
    <>
        <NavbarDashboard/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-g0 to-g1">
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
                <UserProfileLayout style='flex-col'/>
            </div>
            <LogoutButton />
          <form action="">
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
              <input type="text" id="cpf" name="cpf" className="border rounded-md p-2 mb-4" placeholder="CPF" />
            </li>
            <li className="list-none flex flex-col text-t2">
              <label htmlFor="endereco">Endereço</label>
              <input type="text" id="endereco" name="endereco" className='border rounded-md p-2 mb-4' placeholder='Endereço'/>
            </li>
            <li className="list-none flex flex-col text-t2">
              <label htmlFor="date">Data de Nascimento</label>
              <input type="date" id="date" name="date" className='border rounded-md p-2 mb-4' placeholder='Data de Nascimento'/>
            </li>
          </form>
        </div>
    </>
  )
}