"use client";


import Image from "next/image";
import React from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./sign-out";

type props = {
    style: string;
}
 
export default function UserProfile({style}: props) {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const { data: session } = authClient.useSession(); 

    if (session) {
        return (
            <>
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex ${style} lg:flex-row justify-center items-center gap-2 lg:m-5 text-t2 font-bold cursor-pointer`}
                    >

                    <Image
                        src={session.user.image || "/login/User.png"}
                        alt="User-Profile-Icon"
                        width={35}
                        height={35}
                        className="rounded-full"
                    />
                    <h1>{session.user.name}</h1>
                        {isDropdownOpen && (
                        <div
                            className="mt-2 bg-gradient-to-b from-g0 to-g1 rounded shadow-lg transition-all duration-300 ease-in-out transform opacity-0 scale-95 absolute top-7 lg:top-15"
                            style={{
                                opacity: isDropdownOpen ? 1 : 0,
                                transform: isDropdownOpen ? "scale(1)" : "scale(0.95)",
                            }}
                        >
                            <ul className="py-2 flex flex-col text-center">
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link href="/dashboard/user">Perfil</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link href="/dashboard/user/information">Informações</Link>
                                </li>
                                <LogoutButton />
                            </ul>
                        </div>
                    )}
                    </div>
            </>
        )
    }
}