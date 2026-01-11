import { authenticator } from "otplib";
import qrcode from "qrcode";

/**
 * Generates a new MFA secret and a corresponding QR code URL.
 * @param email The user's email address to identify the account in Authenticator apps.
 */
export async function generateMFASecret(email: string) {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(email, "PDG Kota Parepare", secret);
    const qrCodeUrl = await qrcode.toDataURL(otpauth);

    return {
        secret,
        qrCodeUrl,
    };
}

/**
 * Verifies a TOTP token against a given secret.
 * @param token The 6-digit token entered by the user.
 * @param secret The user's stored MFA secret.
 */
export function verifyMFAToken(token: string, secret: string): boolean {
    authenticator.options = { window: 0 };
    return authenticator.verify({ token, secret });
}
