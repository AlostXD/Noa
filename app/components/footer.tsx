import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
        <div className="border-t border-black">
            <div className="">
                <h1>Conecte-se conosco!</h1>
                <Link href="https://www.instagram.com/noa.condominios/" target="_blank" className="flex items-center gap-2">a</Link>
                <Link href="https://www.instagram.com/noa.condominios/" target="_blank" className="flex items-center gap-2">b</Link>
                <Link href="https://www.instagram.com/noa.condominios/" target="_blank" className="flex items-center gap-2">c</Link>
            </div>
            <div className="">
                <h1>Empresa</h1>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                    <li><a href="#solucoes">Soluões</a></li>
                </ul>
            </div>
            <div className="">
                <h1>Entre em contato</h1>
                <ul>
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