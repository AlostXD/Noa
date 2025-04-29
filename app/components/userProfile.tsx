
import Image from "next/image";
import React from "react";
import { authClient } from "@/lib/auth-client";
 
export default function UserProfile() {
    
    const { data: session } = authClient.useSession(); 

    if (!session) {
        return (
            <>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                        src="/icon.png"
                        alt="User-Profile-Icon"
                        width={50}
                        height={50}
                        className="rounded-full border-2 border-t1"
                    />
                    <p>Crie sua conta</p>
                </div>
            </>
        )
    }
    else{
        return (
            <>
                <div className="">
                    <Image
                        src="/icon.png"
                        alt="User-Profile-Icon"
                        width={50}
                        height={50}
                    />
                    <p>{session.user.id}</p>
                    <p>{session.user.name}</p>
                    <p>{session.user.email}</p>
                </div>
            </>
        )
    }
}