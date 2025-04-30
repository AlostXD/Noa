/*

import { useRouter } from "next/router";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";

export default function UserPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const { userId } = router.query; // Obtém o ID do usuário da URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redireciona para a página de login se o usuário não estiver autenticado
      router.push("/login");
    } else if (status === "authenticated" && userId) {
      // Busca os dados do usuário com base no ID
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Erro ao buscar dados do usuário:", err));
    }
  }, [status, userId, router]);

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!userData) {
    return <p>Carregando informações do usuário...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Informações do Usuário</h1>
      <p><strong>ID:</strong> {userData.id}</p>
      <p><strong>Nome:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      {/* Adicione mais informações conforme necessário */}
    </div>
  );
}

*/