import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            role: "admin" | "mayor" | "department_head" | "public" | "masyarakat" | string
            department?: string | null
            nik?: string | null
            phone?: string | null
            address?: string | null
        } & DefaultSession["user"]
    }

    interface User {
        role: "admin" | "mayor" | "department_head" | "public" | "masyarakat" | string
        department?: string | null
        nik?: string | null
        phone?: string | null
        address?: string | null
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "admin" | "mayor" | "department_head" | "public" | "masyarakat" | string
        department?: string | null
        nik?: string | null
        phone?: string | null
        address?: string | null
    }
}
