import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient({
    baseURL: "https://localhost:3000",
});