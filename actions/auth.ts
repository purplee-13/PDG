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
        return { error: "Akun tidak ditemukan atau password salah." };
    }

    const passwordsMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordsMatch) {
        return { error: "Email atau password salah." };
    }

    const isMfaActive = existingUser.mfaEnabled === true || (existingUser.mfaEnabled as any) === 1 || (existingUser.mfaEnabled as any) === "true";
    console.log("[LOGIN ACTION] MFA Data:", { email, mfaEnabled: existingUser.mfaEnabled, isMfaActive, hasCode: !!code });

    if (isMfaActive) {
        if (code) {
            // User sent code, verify it
            const mfaSecret = existingUser.mfaSecret;
            if (!mfaSecret) {
                console.log("[LOGIN ACTION] MFA Secret missing!");
                return { error: "Terjadi kesalahan internal MFA." };
            }

            const isValid = verifyMFAToken(code, mfaSecret);
            if (!isValid) {
                console.log("[LOGIN ACTION] Invalid MFA code");
                return { error: "Kode MFA salah!", mfaRequired: true };
            }

            console.log("[LOGIN ACTION] MFA verified successfully");
        } else {
            // User has MFA but didn't send code -> Prompt MFA
            console.log("[LOGIN ACTION] MFA required but code missing in form");
            return { mfaRequired: true };
        }
    }

    try {
        const redirectTo = existingUser.role === "masyarakat" ? "/" : "/dashboard";

        const result = await signIn("credentials", {
            email,
            password,
            code,
            redirect: false,
        });

        if (result?.error) {
            return { error: "Kredensial tidak valid." };
        }

        return {
            success: true,
            redirectTo,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                department: existingUser.department,
                nik: existingUser.nik,
                phone: existingUser.phone,
                address: existingUser.address,
                permissions: [] // Permissions will be calculated on client or we can do it here if we want perfect sync, but Client AuthContext does it by role. 
                // We'll leave permissions empty here and let AuthContext recalculate based on role if needed, 
                // but AuthContext expects full User object. 
            }
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Kredensial tidak valid." };
                default:
                    return { error: "Terjadi kesalahan login." };
            }
        }
        // In case of other errors (though redirect:false prevents NEXT_REDIRECT usually)
        throw error;
    }
}

export async function setupMfa() {
    // This action would be called from the settings page
    // 1. Get current user session (mocking for now or pass userId if needed)
    // 2. Generate secret
    // 3. Return secret & QR
}
