import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/auth/user";
import { verifyMFAToken } from "@/lib/auth/mfa";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, code } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email dan password wajib diisi." },
                { status: 400 }
            );
        }

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
            return NextResponse.json(
                { error: "Email atau password salah." },
                { status: 401 }
            );
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return NextResponse.json(
                { error: "Email atau password salah." },
                { status: 401 }
            );
        }

        // Check MFA Status
        const isMfaActive = user.mfaEnabled === true || (user.mfaEnabled as any) === 1 || (user.mfaEnabled as any) === "true";

        if (isMfaActive) {
            if (!code) {
               
                // Session is NOT created.
                return NextResponse.json({
                    mfaRequired: true,
                    message: "MFA diperlukan untuk melanjutkan."
                });
            }

            const isValid = verifyMFAToken(code, user.mfaSecret as string);
            if (!isValid) {
                return NextResponse.json(
                    { error: "Kode MFA salah atau sudah kadaluwarsa (berlaku 30 detik).", mfaRequired: true },
                    { status: 401 }
                );
            }
        }

        try {
            const result = await signIn("credentials", {
                email,
                password,
                code,
                redirect: false,
            });

            if (!result) {
                return NextResponse.json(
                    { error: "Gagal membuat sesi login." },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                success: true,
                redirectTo: user.role === "masyarakat" ? "/" : "/dashboard",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        } catch (authError: any) {
            return NextResponse.json(
                { error: "Terjadi kesalahan saat autentikasi." },
                { status: 401 }
            );
        }

    } catch (error) {
        console.error("[API LOGIN ERROR]", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
