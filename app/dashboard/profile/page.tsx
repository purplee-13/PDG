import MfaSetup from "@/components/auth/mfa-setup"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
    const session = await auth()

    // Simple protection
    if (!session) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Pengaturan Profil</h1>
                    <div className="text-sm text-gray-500">
                        Login sebagai: <span className="font-medium text-gray-900">{session.user?.email}</span>
                    </div>
                </div>

                <MfaSetup />

                {/* Debug Info */}
                <div className="mt-8 p-4 bg-gray-100 rounded text-xs font-mono">
                    <p className="font-bold text-gray-500 mb-2">Session Debug:</p>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </div>
            </div>
        </div>
    )
}
