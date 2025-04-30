"use client"


import React from 'react'
import LogoutButton from '../components/sign-out'
import { useRouter } from 'next/navigation'

export default function SignOut() {
    const router = useRouter()
  return (
    <>
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center bg-white p-8 rounded shadow-md w-96 gap-4">
                <h1 className='text-xl font-bold'>Deseja desconectar sua conta?</h1>
                <p>Ao desconectar, você precisará fazer login novamente para acessar sua conta.</p>
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className='px-4 py-2 bg-g0 text-white rounded hover:bg-g1 transition cursor-pointer w-24'
                    >
                    Continar
                    </button>
                    <LogoutButton width="w-24"/>
                </div>
            </div>
        </div>
    </>
  )
}