import { authClient } from "@/lib/auth-client";

interface SignUpProps {
  email: string;
  password: string;
  name: string;
  image?: string;
  callbackURL?: string;
}

// Exporta uma função de cadastro que pode ser usada no seu formulário
export async function signUp({ email, password, name, image, callbackURL }: SignUpProps) {
  return await authClient.signUp.email({
    email,
    password,
    name,
    image,
    callbackURL,
  });
}