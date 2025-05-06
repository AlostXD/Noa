import React from 'react'
import UserProfileLayout from '@/app/components/userProfileLayout'
import NavbarDashboard from '@/app/components/navbarDashboard'
import LogoutButton from '@/app/components/sign-out'
import RegisterInfo from '@/app/components/registerInfo'



export default async function userPage() {

  return (
    <>
        <NavbarDashboard/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-g0 to-g1 gap-4">
            <h1 className='text-3xl text-t2 font-bold'>Informações pessoais</h1>
            <h3 className='text-lg text-t2 italic'>Essas informações poderão ser utilizadas em documentos para emissões.</h3>
            <RegisterInfo />
        </div>
    </>
  )
}