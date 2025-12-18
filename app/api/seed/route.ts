import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, "admin@parepare.go.id"),
        });

        if (existingUser) {
            return NextResponse.json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash("admin", 10);

        await db.insert(users).values({
            email: "admin@parepare.go.id",
            name: "Admin Parepare",
            password: hashedPassword,
            role: "admin",
            mfaEnabled: false,
        });

        return NextResponse.json({ message: "Admin created successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to seed", details: error }, { status: 500 });
    }
}
