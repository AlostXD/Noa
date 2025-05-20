import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: "https://noa-tau.vercel.app",
});