"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

type Props = {
  width?: string;
}

export default function LogoutButton({ width }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    toast.success("Logout feito com sucesso!");
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer ${width || "w-auto"}`}
    >
      Sair
    </button>
  );
}
