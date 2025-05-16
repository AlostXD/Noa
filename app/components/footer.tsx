import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
        <div className="border-t border-black flex flex-col md:flex-row gap-12 p-4 items-center justify-evenly bg-gradient-to-r from-g0 to-g1 text-white">
            <div className="flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-lg">Conecte-se conosco!</h1>
                <ul className="flex gap-2 items-center justify-center">
                    <Link href="https://www.instagram.com/noa.condominios/" target="_blank" className="flex items-center gap-2">
                        <Image
                            src="/home/face-f.png"
                            alt="Facebook"
                            width={30}
                            height={30} 
                        />
                    </Link>
                    <Link href="https://www.instagram.com/noa.condominios/" target="_blank" className="flex items-center gap-2">
                        <Image
                            src="/home/linkedin-f.png"
                            alt="LinkedIn"
                            width={30}
                            height={30} 
                        />
                    </Link>
                    <Link href="https://www.instagram.com/noa.condominios/" target="_blank" className="flex items-center gap-2">
                        <Image
                            src="/Home/twitter-f.png"
                            alt="Twitter"
                            width={30}
                            height={30} 
                        />
                    </Link>
                </ul>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-lg">Empresa</h1>
                <Link href="/" className="text-sm text-white font-normal cursor-pointer hover:shadow-sm">
                    Sobre nós
                </Link>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-lg">Entre em contato</h1>
                <ul className="flex flex-col gap-2 items-center justify-center">
                    <li>
                        <Image
                            src="/Logo-B.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </li>
                    <li>
                        <Image
                            src="/Logo-B.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </li>
                    <li>
                        <Image
                            src="/Logo-B.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </li>
                    <li>
                        <Image
                            src="/Logo-B.png"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </li>
                </ul>
            </div>
        </div>
    </>
  )
}