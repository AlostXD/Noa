import React from 'react'
import UserProfileLayout from '@/app/components/userProfileLayout'
import NavbarDashboard from '@/app/components/navbarDashboard'
import GetInfo from "@/app/components/getInfo"



export default async function userPage() {

  return (
    <>
        <NavbarDashboard/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-g0 to-g1">
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
                <UserProfileLayout style='flex-col'/>
                <GetInfo/>
            </div>
        </div>
    </>
  )
}