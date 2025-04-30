import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

export async function getSessionServer() {
  const cookieStore = await cookies(); // pega cookies do contexto do server
  const headers = new Headers();
  cookieStore.getAll().forEach((cookie: { name: string; value: string }) => {
    headers.append("cookie", `${cookie.name}=${cookie.value}`);
  });

  const session = await auth.api.getSession({ headers });
  return session;
}
