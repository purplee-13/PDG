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

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.password || !existingUser.email) {
        return { error: "Email atau password salah." };
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
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
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
