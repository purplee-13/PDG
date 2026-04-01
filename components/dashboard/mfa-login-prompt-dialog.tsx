"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import {
  clearMfaPromptPending,
  deferMfaPromptUntilNextLogin,
  shouldOfferMfaPromptClient,
} from "@/lib/auth/mfa-prompt-session"

type MfaLoginPromptDialogProps = {
  /** Dari server / DB: MFA sudah aktif */
  mfaEnabled: boolean
  /** Path tanpa query setelah "Nanti saja" (sesuai halaman tujuan setelah login) */
  dismissPath?: string
}

export function MfaLoginPromptDialog({ mfaEnabled, dismissPath = "/dashboard" }: MfaLoginPromptDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const skipCleanUrlRef = useRef(false)

  // Jangan panggil clearMfaPromptPending() di sini: React Strict Mode menjalankan effect dua kali
  // sehingga pending terhapus di run pertama dan popup tertutup di run kedua.
  useEffect(() => {
    if (mfaEnabled) {
      setOpen(false)
      return
    }
    if (!shouldOfferMfaPromptClient()) {
      setOpen(false)
      return
    }
    setOpen(true)
  }, [mfaEnabled])

  const handleLater = () => {
    deferMfaPromptUntilNextLogin()
    setOpen(false)
  }

  const handleActivate = () => {
    clearMfaPromptPending()
    skipCleanUrlRef.current = true
    setOpen(false)
    router.push("/dashboard/profile")
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          if (!skipCleanUrlRef.current) {
            router.replace(dismissPath)
          } else {
            skipCleanUrlRef.current = false
          }
        }
        setOpen(next)
      }}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <Shield className="h-6 w-6 text-amber-700" aria-hidden />
          </div>
          <AlertDialogTitle className="text-center">Aktifkan MFA</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            Saat ini akun Anda belum menggunakan pengamanan berlapis (MFA). Aktifkan MFA untuk melindungi akun dari
            akses yang tidak sah dan lebih aman.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          <Button type="button" variant="outline" className="w-full" onClick={handleLater}>
            Nanti saja
          </Button>
          <Button type="button" className="w-full bg-green-600 hover:bg-green-700" onClick={handleActivate}>
            Aktifkan MFA
          </Button>
        </AlertDialogFooter>
        <p className="text-center text-xs leading-relaxed text-muted-foreground px-1 -mt-1">
          MFA menambah satu langkah setelah sandi: Anda memasukkan kode pendek dari aplikasi autentikator (Google
          Authenticator) di ponsel. Tanpa kode itu, orang lain tidak bisa masuk meski mengetahui kata sandi Anda.
        </p>
      </AlertDialogContent>
    </AlertDialog>
  )
}
