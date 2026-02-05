import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    nik: z.string().length(16, "NIK harus 16 karakter"),
    name: z.string().min(1, "Nama harus diisi"),
    birthDate: z.string().optional(),
    province: z.string().min(1, "Provinsi harus diisi"),
    city: z.string().min(1, "Kota/Kabupaten harus diisi"),
    district: z.string().min(1, "Kecamatan harus diisi"),
    village: z.string().min(1, "Kelurahan harus diisi"),
    rt: z.string().optional(),
    rw: z.string().optional(),
    postalCode: z.string().optional(),
    address: z.string().min(1, "Alamat harus diisi"),
    phone: z.string().min(1, "Nomor HP harus diisi"),
    email: z.string().email("Email tidak valid"),
    username: z.string().min(1, "Username harus diisi"),
    password: z.string()
        .min(8, "Password minimal 8 karakter")
        .regex(/\d/, "Password harus mengandung setidaknya satu angka")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password harus mengandung setidaknya satu simbol"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const validatedData = registerSchema.safeParse(body);
        if (!validatedData.success) {
            return NextResponse.json(
                { error: "Validasi gagal", details: validatedData.error.flatten() },
                { status: 400 }
            );
        }

        const {
            nik, email, username, password,
            name, birthDate, phone, address,
            province, city, district, village,
            rt, rw, postalCode
        } = validatedData.data;

        // Check if user exists (by email, nik, or username)
        const existingUser = await db.query.users.findFirst({
            where: or(
                eq(users.email, email),
                eq(users.nik, nik),
                eq(users.username, username)
            ),
        });

        if (existingUser) {
            let message = "User sudah terdaftar.";
            if (existingUser.email === email) message = "Email sudah terdaftar.";
            if (existingUser.nik === nik) message = "NIK sudah terdaftar.";
            if (existingUser.username === username) message = "Username sudah digunakan.";

            return NextResponse.json(
                { error: message },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await db.insert(users).values({
            nik,
            name,
            email,
            username,
            password: hashedPassword,
            phone,
            birthDate, // simpan string dari form
            address,
            province,
            city,
            district,
            village,
            rt,
            rw,
            postalCode,
            role: "masyarakat",
            // default fields
            emailVerified: null,
            image: null,
        });

        return NextResponse.json(
            { message: "Registrasi berhasil" },
            { status: 201 }
        );

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan internal server" },
            { status: 500 }
        );
    }
}
