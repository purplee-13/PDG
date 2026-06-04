"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { unlockUserAccount } from "@/lib/auth/mfa-lockout"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function checkAccountLockStatus(email: string) {
  const trimmed = email.trim()
  if (!trimmed) {
    return { error: "Email wajib diisi." }
  }

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      isLocked: users.isLocked,
      mfaFailedAttempts: users.mfaFailedAttempts,
    })
    .from(users)
    .where(eq(users.email, trimmed))
    .limit(1)

  const user = rows[0]
  if (!user) {
    return { found: false as const }
  }

  return {
    found: true as const,
    isLocked: user.isLocked === true,
    mfaFailedAttempts: user.mfaFailedAttempts ?? 0,
    email: user.email,
  }
}

/** Hanya admin yang dapat membuka kunci akun (pemulihan). */
export async function adminUnlockUserAccount(userId: string) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return { error: "Tidak diizinkan." }
  }

  try {
    await unlockUserAccount(userId)
    revalidatePath("/dashboard/users")
    return { success: true }
  } catch {
    return { error: "Gagal membuka kunci akun." }
  }
}
