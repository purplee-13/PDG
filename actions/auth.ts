"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/lib/auth/user";
import { generateMFASecret, verifyMFAToken } from "@/lib/auth/mfa";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const code = formData.get("code") as string | null;

    if (!email || !password) {
        return { error: "Email dan password wajib diisi." };
    }

    const { getUserByIdentifier } = await import("@/lib/auth/user");
    const existingUser = await getUserByIdentifier(email);

    if (!existingUser || !existingUser.password || !existingUser.email) {
        return { error: "Akun tidak ditemukan atau password salah." };
    }

    const passwordsMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordsMatch) {
        return { error: "Email atau password salah." };
    }

    if (existingUser.mfaEnabled) {
        if (code) {
            // User sent code, verify it
            const mfaSecret = existingUser.mfaSecret;
            if (!mfaSecret) {
                // Should not happen if mfaEnabled is true
                return { error: "Terjadi kesalahan internal MFA." };
            }

            const isValid = verifyMFAToken(code, mfaSecret);
            if (!isValid) {
                return { error: "Kode MFA salah!", mfaRequired: true };
            }

            // Fall through to normal sign in
        } else {
            // User has MFA but didn't send code -> Prompt MFA
            return { mfaRequired: true };
        }
    }

    try {
        // Redirect based on role not needed here if handled by middleware or dashboard page redirection
        // But let's simple redirect to /dashboard and let the dashboard handle it, OR
        // we can check role here. 
        // Note: signIn in NextAuth v5 throws an error for redirect.

        // If we want custom redirection logic we can do it after sign in or let the default happen.
        // The issue 'user registered as staff' was likely due to hardcoded mock data or default role logic errors which we fixed.
        // User asked to be redirected to login AFTER registration, which we fixed in register/page.tsx.
        // Now for login, if they are "masyarakat", they go to dashboard/public-services or similar.
        // However, the prompt says "setelah registrasi berhasil ... diarahkan ke halaman login kembali". This is done.
        // The prompt ALSO says "jika regis, user terdaftar sebagai 'Staff' ... ubah role menjadi 'Masyarakat'". This is done in route.ts.

        const redirectTo = existingUser.role === "masyarakat" ? "/" : "/dashboard";

        await signIn("credentials", {
            email,
            password,
            redirectTo,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Kredensial tidak valid." };
                default:
                    return { error: "Terjadi kesalahan login." };
            }
        }
        throw error;
    }
}

export async function setupMfa() {
    // This action would be called from the settings page
    // 1. Get current user session (mocking for now or pass userId if needed)
    // 2. Generate secret
    // 3. Return secret & QR
}
