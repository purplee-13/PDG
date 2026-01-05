import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
    // @ts-expect-error Adapter type mismatch with custom User type
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email/Username/NIK", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const { getUserByIdentifier } = await import("@/lib/auth/user");
                const bcrypt = await import("bcryptjs");

                const user = await getUserByIdentifier(credentials.email as string);

                if (!user || !user.password) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (passwordsMatch) {
                    return {
                        ...user,
                        role: user.role || "masyarakat",
                    } as any;
                }

                return null;
            }
        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role

                token.id = user.id
                token.department = user.department

                token.nik = user.nik

                token.phone = user.phone

                token.address = user.address

            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string
                session.user.id = token.id as string
                session.user.department = token.department as string | null
                session.user.nik = token.nik as string | null
                session.user.phone = token.phone as string | null
                session.user.address = token.address as string | null

            }
            return session
        },
    },
})
