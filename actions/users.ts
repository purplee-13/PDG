"use server"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

// 1. Get List of Users
// 1. Get List of Users
export async function getUsers(query?: string, role?: string) {
    // Start with the base selection
    const filters = [];

    if (query) {
        // Simple search by name or email
        // Note: Drizzle ORM might strictly require like/ilike import, using a simplified approach
        // or check if 'ilike' is available in your current Drizzle version/driver.
        // For standard pg-core:
        const { ilike, or } = await import("drizzle-orm");
        filters.push(or(ilike(users.name, `%${query}%`), ilike(users.email, `%${query}%`)));
    }

    if (role && role !== "all") {
        const { eq } = await import("drizzle-orm");
        filters.push(eq(users.role, role as any));
    }

    // Combine filters with 'and' if any exist
    let whereClause = undefined;
    if (filters.length > 0) {
        const { and } = await import("drizzle-orm");
        whereClause = and(...filters);
    }

    const allUsers = await db.select()
        .from(users)
        .where(whereClause)
        .orderBy(desc(users.name));

    return allUsers;
}

// 2. Create User
export async function createUser(formData: FormData) {
    const session = await auth()
    if (session?.user?.role !== "admin") {
        return { error: "Unauthorized" }
    }

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as "admin" | "mayor" | "department_head" | "public"
    const department = formData.get("department") as string
    const password = formData.get("password") as string

    if (!email || !password || !name) {
        return { error: "Semua field wajib diisi." }
    }

    // Check existing
    const existing = await db.query.users.findFirst({ where: eq(users.email, email) })
    if (existing) {
        return { error: "Email sudah terdaftar." }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.insert(users).values({
            name,
            email,
            role,
            department: department || null,
            password: hashedPassword,
            image: `https://ui-avatars.com/api/?name=${name}&background=random`,
            mfaEnabled: false
        })
        revalidatePath("/dashboard/users")
        return { success: true }
    } catch (e) {
        return { error: "Gagal membuat user." }
    }
}

// 3. Update User
export async function updateUser(userId: string, formData: FormData) {
    const session = await auth()
    if (session?.user?.role !== "admin") {
        return { error: "Unauthorized" }
    }

    const name = formData.get("name") as string
    const role = formData.get("role") as any
    const department = formData.get("department") as string

    try {
        await db.update(users)
            .set({ name, role, department: department || null })
            .where(eq(users.id, userId))

        revalidatePath("/dashboard/users")
        return { success: true }
    } catch (e) {
        return { error: "Gagal update user." }
    }
}

// 4. Delete User
export async function deleteUser(userId: string) {
    const session = await auth()
    if (session?.user?.role !== "admin") {
        return { error: "Unauthorized" }
    }

    try {
        await db.delete(users).where(eq(users.id, userId))
        revalidatePath("/dashboard/users")
        return { success: true }
    } catch (e) {
        return { error: "Gagal menghapus user." }
    }
}
