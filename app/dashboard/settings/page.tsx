import { auth } from "@/auth"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import MfaSetup from "@/components/auth/mfa-setup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function SettingsPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const { user } = session

    const { db } = await import("@/lib/db")
    const { users } = await import("@/lib/db/schema")
    const { eq } = await import("drizzle-orm")

    const dbUser = await db.query.users.findFirst({
        where: eq(users.id, user.id as string),
        columns: {
            mfaEnabled: true
        }
    })

    const isMfaEnabled = dbUser?.mfaEnabled ?? false

    return (
        <DashboardLayout user={session.user}>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Pengaturan Akun</h3>
                    <p className="text-sm text-muted-foreground">
                        Kelola keamanan dan preferensi akun Anda.
                    </p>
                </div>
                <Separator />

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Keamanan & Otentikasi</CardTitle>
                            <CardDescription>Atur metode masuk dan keamanan tambahan.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-2">
                                <h4 className="font-medium">Multi-Factor Authentication (MFA)</h4>
                                <p className="text-sm text-gray-500 mb-4">
                                    Tingkatkan keamanan akun dengan mewajibkan kode verifikasi dari aplikasi Authenticator saat login.
                                </p>
                                <div className="max-w-md">
                                    <MfaSetup isEnabled={isMfaEnabled} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
