/** sessionStorage: prompt MFA setelah login; "Nanti saja" menunda hingga login berikutnya. */

export const MFA_SESSION_PROMPT_PENDING = "pdg_mfa_prompt_pending"
export const MFA_SESSION_DEFERRED = "pdg_mfa_prompt_deferred"

export function markMfaPromptPendingAfterLogin() {
  if (typeof window === "undefined") return
  sessionStorage.setItem(MFA_SESSION_PROMPT_PENDING, "1")
  sessionStorage.removeItem(MFA_SESSION_DEFERRED)
}

export function deferMfaPromptUntilNextLogin() {
  if (typeof window === "undefined") return
  sessionStorage.setItem(MFA_SESSION_DEFERRED, "1")
  sessionStorage.removeItem(MFA_SESSION_PROMPT_PENDING)
}

export function clearMfaPromptPending() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(MFA_SESSION_PROMPT_PENDING)
}

export function clearMfaPromptSession() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(MFA_SESSION_PROMPT_PENDING)
  sessionStorage.removeItem(MFA_SESSION_DEFERRED)
}

export function shouldOfferMfaPromptClient(): boolean {
  if (typeof window === "undefined") return false
  if (sessionStorage.getItem(MFA_SESSION_DEFERRED) === "1") return false
  return sessionStorage.getItem(MFA_SESSION_PROMPT_PENDING) === "1"
}
