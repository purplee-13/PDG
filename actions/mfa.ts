"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { generateMFASecret, verifyMFAToken } from "@/lib/auth/mfa"
import { revalidatePath } from "next/cache"

export async function generateMfaSecretAction() {
    const session = await auth()
    if (!session?.user?.email) {
        throw new Error("Unauthorized")
    }

    const { secret, qrCodeUrl } = await generateMFASecret(session.user.email)

    // Store secret temporarily or return it to be verified.
    // Ideally we store it in DB but with enabled=false
    // But for this simple implementation, we can return it and save only upon verification.

    return { secret, qrCodeUrl }
}

export async function enableMfaAction(secret: string, code: string) {
    const session = await auth()
    if (!session?.user?.email) {
        throw new Error("Unauthorized")
    }

    const isValid = verifyMFAToken(code, secret)
    if (!isValid) {
        return { error: "Kode token salah." }
    }

    // Save to DB
    // We need to find user ID first. Auth.js session usually has it, but better query by email to be safe
    // or if we trust session.user.id

    if (!session.user.id) {
        return { error: "Session Invalid (Missing ID). Silakan Logout & Login ulang." }
    }

    await db.update(users)
        .set({
            mfaSecret: secret,
            mfaEnabled: true
        })
        .where(eq(users.email, session.user.email))

    revalidatePath("/dashboard")
    return { success: true }
}
