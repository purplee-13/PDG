import { authenticator } from "otplib"
import qrcode from "qrcode"

/** Toleransi ±1 interval (30 detik) agar sinkron dengan Google Authenticator */
authenticator.options = { window: 1 }

function normalizeOtpToken(token: string): string {
  return token.replace(/\D/g, "").slice(0, 6)
}

function normalizeSecret(secret: string): string {
  return secret.replace(/\s/g, "").toUpperCase()
}

/**
 * Generates a new MFA secret and a corresponding QR code URL.
 * @param email The user's email address to identify the account in Authenticator apps.
 */
export async function generateMFASecret(email: string) {
  const secret = authenticator.generateSecret()
  const otpauth = authenticator.keyuri(email, "PDG Kota Parepare", secret)
  const qrCodeUrl = await qrcode.toDataURL(otpauth)

  return {
    secret,
    qrCodeUrl,
  }
}

/**
 * Verifies a TOTP token against a given secret.
 */
export function verifyMFAToken(token: string, secret: string): boolean {
  if (!token || !secret) return false

  const normalizedToken = normalizeOtpToken(token)
  if (normalizedToken.length !== 6) return false

  const normalizedSecret = normalizeSecret(secret)
  if (!normalizedSecret) return false

  try {
    return authenticator.check(normalizedToken, normalizedSecret)
  } catch {
    return false
  }
}
