-- Kolom untuk batas percobaan MFA dan penangguhan akun (sesuaikan dengan schema Drizzle)
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "mfaFailedAttempts" integer DEFAULT 0;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "isLocked" boolean DEFAULT false;
