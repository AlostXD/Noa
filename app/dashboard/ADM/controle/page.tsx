"use client";

import NavbarDashboard from "@/app/components/navbarDashboard";
import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function Controle() {
  const [data, setData] = useState<
    { id: string; nome: string; endereco: string }[]
  >([]); // Define the expected structure of the data

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/acessar");
        const result = await response.json();
        setData(result); // Assuming the API returns an array of strings
        console.log(result); // Log the result for debugging
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavbarDashboard />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="font-bold text-xl md:text-3xl text-center">
          Escolha o condomínio desejado para acessar
        </h1>
        {data.map((item) => {
          return (
            <Link
              key={item.id}
              className="p-4 shadow-lg rounded-md bg-gray-100 hover:bg-gray-300 transition-all duration-300 hover:scale-110 w-full max-w-md text-center"
              href={`/dashboard/adm/controle/condominio/${item.id}`}
            >
              <h2 className="text-xl font-bold">{item.nome}</h2>
              <p>{item.endereco}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
