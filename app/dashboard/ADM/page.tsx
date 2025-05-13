"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

import Image from 'next/image';
import Link from 'next/link';
//import UserProfile from '../components/userProfile';

export default function AdminDashboardPage() {
  return (
   <div className="flex flex-row justify-center w-full bg-white [background:linear-gradient(90deg,rgba(7,21,49,1)_0%,rgba(7,22,50,1)_6%,rgba(7,24,53,1)_13%,rgba(6,27,58,1)_19%,rgba(6,32,64,1)_25%,rgba(5,37,72,1)_31%,rgba(5,44,80,1)_38%,rgba(4,50,90,1)_44%,rgba(4,58,100,1)_50%,rgba(3,65,110,1)_56%,rgba(2,78,128,1)_69%,rgba(1,83,136,1)_75%,rgba(1,88,142,1)_81%,rgba(0,91,147,1)_88%)]  ">
        <div className="w-full max-w-[1200px] min-h-screen flex flex-col items-start p-4 lg:p-8 mx-auto relative">
          <div className="w-full max-w-[700px] lg:max-w-[1330px] flex flex-col items-start mt-14">
            <div className="flex justify-between items-center w-full mb-8">
              <Image
                  src="/Logo-B.png"
                  alt="Logo"
                  width={106}
                  height={61}
                />

              <div className="flex items-center gap-1">
                
                {/*
                <Image
                  src="/Login/user.png"
                  alt="User"
                  width={34}
                  height={34}
                />  A imagem esta com mais qualidade que a do user abaixo, mas se eu mexer vai da problema
                */}
                
                {/*<UserProfile style='flex-row' />*/}
                
                <Image
                  src="/Login/seta.png"
                  alt="Seta"
                  width={12}
                  height={12}
                />
                
              </div>
            </div>
          </div>

          <hr className="w-full max-w-[1330px] border-t border-white mb-8 lg:mb-16 " />

          <div className="w-full max-w-[700px] lg:max-w-[1330px] flex flex-col items-start">
            <div className="mb-6 lg:mb-10">
              <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-xl tracking-[0] leading-[normal] mb-2">
                Funções
              </div>
              <hr className="w-[120px] bg-white h-[3px] border-0 p-0 m-0 mb-4"/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
              {[   
                { img: "cad-adm.png", text: "Cadastros Gerais", path: "/agendamento" }, 
                { img: "for.png", text: "Fórum", path: "/forum" },
                { img: "age.png", text: "Agendamento", path: "/agendamento" }, /*   */
                { img: "comu-adm.png", text: "Comunicação Interna", path: "/agendamento" },
                { img: "fin.png", text: "Financeiro", path: "/financeiro" },
                { img: "imp-adm.png", text: "Impressão de relatórios", path: "/documentos" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="inline-flex items-center gap-4 ">
                  <Image
                    width={58}
                    height={58}
                    alt={item.text}
                    src={`/Login/adm/${item.img}`}
                  />
                  <div className="[font-family:'Poppins',Helvetica] font-bold text-white text-base tracking-[0] leading-[normal]">
                    {item.text}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}