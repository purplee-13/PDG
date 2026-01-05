import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";

export async function getUserByEmail(email: string) {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        return user;
    } catch {
        return null;
    }
}

export async function getUserByIdentifier(identifier: string) {
    try {
        const user = await db.query.users.findFirst({
            where: or(
                eq(users.email, identifier),
                eq(users.username, identifier),
                eq(users.nik, identifier)
            ),
        });
        return user;
    } catch {
        return null;
    }
}
