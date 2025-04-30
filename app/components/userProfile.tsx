import Image from "next/image";
import React from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

type props = {
    style: string;
}
 
export default function UserProfile({style}: props) {
    
    const { data: session } = authClient.useSession(); 

    if (session) {
        return (
            <>
                <Link
                    href={"/dashboard/user"}
                    className={`flex ${style} lg:flex-row justify-center items-center gap-2 lg:m-5 text-t2 font-bold`}
                >
                    <Image
                        src={session.user.image || "/login/User.png"}
                        alt="User-Profile-Icon"
                        width={35}
                        height={35}
                        className="rounded-full"
                    />
                    <h1>{session.user.name}</h1>
                </Link>
            </>
        )
    }
}