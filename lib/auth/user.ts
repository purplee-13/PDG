import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function getUserByEmail(email: string) {
  try {
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.email, email.trim()))
      .limit(1)
    return rows[0] ?? null
  } catch (error) {
    console.error("[getUserByEmail]", error)
    return null
  }
}
