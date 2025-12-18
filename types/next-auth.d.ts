import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            role: "admin" | "mayor" | "department_head" | "public" | string
            department?: string | null
        } & DefaultSession["user"]
    }

    interface User {
        role: "admin" | "mayor" | "department_head" | "public" | string
        department?: string | null
    }
}
