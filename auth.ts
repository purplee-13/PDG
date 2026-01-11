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
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                code: { label: "MFA Code", type: "text" }
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const { getUserByEmail } = await import("@/lib/auth/user");
                const bcrypt = await import("bcryptjs");

                console.log("[AUTH] Authorizing user:", credentials.email);
                const user = await getUserByEmail(credentials.email as string);

                if (!user || !user.password) {
                    console.log("[AUTH] User not found or no password");
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordsMatch) {
                    console.log("[AUTH] Password mismatch");
                    return null;
                }

                // MFA Check - Be extremely strict
                // Drizzle/PG might return boolean as 1/0 or true/false
                const isMfaActive = user.mfaEnabled === true || (user.mfaEnabled as any) === 1 || (user.mfaEnabled as any) === "true";

                console.log("[AUTH] MFA Data:", { mfaEnabled: user.mfaEnabled, isMfaActive, hasCode: !!credentials.code });

                if (isMfaActive) {
                    if (!credentials.code) {
                        console.log("[AUTH] BLOCKED: MFA required but code missing");
                        // Returning null here tells NextAuth the authorization failed
                        return null;
                    }

                    const { verifyMFAToken } = await import("@/lib/auth/mfa");
                    const isValid = verifyMFAToken(credentials.code as string, user.mfaSecret as string);

                    if (!isValid) {
                        console.log("[AUTH] BLOCKED: Invalid MFA code");
                        return null;
                    }
                    console.log("[AUTH] MFA verified successfully");
                }

                console.log("[AUTH] Authorization successful for:", user.email);

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role || "masyarakat",
                    department: user.department,
                    nik: user.nik,
                    phone: user.phone,
                    address: user.address,
                };
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
