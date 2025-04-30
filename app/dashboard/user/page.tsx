import React from 'react'
import UserProfileLayout from '@/app/components/userProfileLayout'
import NavbarDashboard from '@/app/components/navbarDashboard'
import LogoutButton from '@/app/components/sign-out'

export default function userPage() {
  return (
    <>
        <NavbarDashboard/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-g0 to-g1">
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
                <UserProfileLayout style='flex-col'/>
            </div>
            <LogoutButton />
        </div>
    </>
  )
}