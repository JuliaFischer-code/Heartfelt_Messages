export function isLikelyE164(s: string) {
    return /^\+\d{8,15}$/.test(s.trim());
  }
  
  export function normalizePhone(s: string) {
    return s.replace(/[^\d+]/g, "");
  }  