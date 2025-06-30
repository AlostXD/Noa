import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
        <div className="border-t border-black flex flex-col md:flex-row gap-12 p-4 items-center justify-evenly bg-gradient-to-r from-g0 to-g1 text-white">
            <div className="flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-lg text-white">CONECTE-SE COM A GENTE!</h1>
                <ul className="flex gap-2 items-center justify-center">
                    <Link href="https://www.instagram.com/noa.condominios/" target="_blank" className="flex items-center gap-2">
                        <Image
                            src="/Home/face-f.png"
                            alt="Facebook"
                            width={30}
                            height={30} 
                        />
                    </Link>
                    <Link href="https://www.instagram.com/noa.condominios/" target="_blank" className="flex items-center gap-2">
                        <Image
                            src="/Home/linkedin-f.png"
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
                <Link href="/" className="text-sm text-white font-normal cursor-pointer hover:shadow-sm">
                    Serviços
                </Link>
                <Link href="/" className="text-sm text-white font-normal cursor-pointer hover:shadow-sm">
                    Dúvidas Frequentes
                </Link>
            </div>
            <div className="flex flex-col gap-4 items-start">
                <h1 className="font-bold text-lg">Entre em contato</h1>
                <ul className="flex flex-col gap-2 items-start">
                    <li className="flex items-center gap-2">
                        <Image
                            src="/local.png"
                            alt="local"
                            width={30}
                            height={30}
                        />
                        <span>2443 Oak Ridge Omaha, QA 45065</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Image
                            src="/telefone.png"
                            alt="telefone"
                            width={25}
                            height={25}
                        />
                        <span>(38)207-8767</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Image
                            src="/zap.png"
                            alt="Zap"
                            width={25}
                            height={25}
                        />
                        <span>(34)99920-3156</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Image
                            src="/email.png"
                            alt="Email"
                            width={25}
                            height={25}
                        />
                        <span>support@site.com</span>
                    </li>
                </ul>
            </div>
                
        </div>
    </>
  )
}