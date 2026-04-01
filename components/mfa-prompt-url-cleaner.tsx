"use client"

import { useEffect } from "react"

/**
 * Menghapus ?mfaPrompt=... dari URL agar tidak tampil di bilah alamat (bookmark / tautan lama).
 */
export function MfaPromptUrlCleaner() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const url = new URL(window.location.href)
    if (!url.searchParams.has("mfaPrompt")) return
    url.searchParams.delete("mfaPrompt")
    const search = url.searchParams.toString()
    const next = `${url.pathname}${search ? `?${search}` : ""}${url.hash}`
    window.history.replaceState({}, "", next)
  }, [])

  return null
}
