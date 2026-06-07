"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { unlockUserAccount } from "@/lib/auth/mfa-lockout"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return { error: "Tidak diizinkan. Hanya admin PDG yang dapat mengakses fitur ini." as const }
  }
  return { session }
}

export type LockedUserRow = {
  id: string
  name: string | null
  email: string
  role: string | null
  mfaEnabled: boolean | null
  mfaFailedAttempts: number | null
  isLocked: boolean | null
}

export async function getLockedUsers() {
  const admin = await requireAdmin()
  if ("error" in admin) return admin

  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      mfaEnabled: users.mfaEnabled,
      mfaFailedAttempts: users.mfaFailedAttempts,
      isLocked: users.isLocked,
    })
    .from(users)
    .where(eq(users.isLocked, true))
    .orderBy(desc(users.mfaFailedAttempts))

  return { users: rows as LockedUserRow[] }
}

export async function adminSearchUserForRecovery(email: string) {
  const admin = await requireAdmin()
  if ("error" in admin) return admin

  const trimmed = email.trim()
  if (!trimmed) {
    return { error: "Email wajib diisi." }
  }

  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      mfaEnabled: users.mfaEnabled,
      mfaFailedAttempts: users.mfaFailedAttempts,
      isLocked: users.isLocked,
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
    user: user as LockedUserRow,
  }
}

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

/** Admin PDG: buka kunci akun yang ditangguhkan karena gagal MFA berulang. */
export async function adminUnlockUserAccount(userId: string) {
  const admin = await requireAdmin()
  if ("error" in admin) return admin

  const rows = await db
    .select({ id: users.id, isLocked: users.isLocked, email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  const target = rows[0]
  if (!target) {
    return { error: "Pengguna tidak ditemukan." }
  }

  if (target.isLocked !== true) {
    return { error: "Akun ini tidak dalam status ditangguhkan." }
  }

  try {
    await unlockUserAccount(userId)
    revalidatePath("/dashboard/users")
    revalidatePath("/dashboard/account-recovery")
    return { success: true, email: target.email }
  } catch {
    return { error: "Gagal membuka kunci akun." }
  }
}
