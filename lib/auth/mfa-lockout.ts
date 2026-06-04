import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const MFA_MAX_ATTEMPTS = 5

export type MfaLockoutResult =
  | { ok: true }
  | { ok: false; locked: boolean; message: string; remainingAttempts?: number }

export async function recordFailedMfaAttempt(
  userId: string,
  currentAttempts: number
): Promise<MfaLockoutResult> {
  const newFailedAttempts = currentAttempts + 1

  if (newFailedAttempts >= MFA_MAX_ATTEMPTS) {
    await db
      .update(users)
      .set({ mfaFailedAttempts: newFailedAttempts, isLocked: true })
      .where(eq(users.id, userId))

    return {
      ok: false,
      locked: true,
      message:
        "Akun Anda telah ditangguhkan karena 5 kali salah memasukkan kode MFA. Silakan lakukan pemulihan akun.",
    }
  }

  await db
    .update(users)
    .set({ mfaFailedAttempts: newFailedAttempts })
    .where(eq(users.id, userId))

  const remaining = MFA_MAX_ATTEMPTS - newFailedAttempts
  return {
    ok: false,
    locked: false,
    message: `Kode MFA salah atau kedaluwarsa. Sisa percobaan: ${remaining}.`,
    remainingAttempts: remaining,
  }
}

export async function resetMfaFailedAttempts(userId: string) {
  await db
    .update(users)
    .set({ mfaFailedAttempts: 0 })
    .where(eq(users.id, userId))
}

export async function unlockUserAccount(userId: string) {
  await db
    .update(users)
    .set({ isLocked: false, mfaFailedAttempts: 0 })
    .where(eq(users.id, userId))
}
