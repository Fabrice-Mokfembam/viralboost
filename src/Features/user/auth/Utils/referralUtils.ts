/**
 * Generate referral link for a given referral code
 */
export const generateReferralLink = (referralCode: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/referral/${referralCode}`;
};

/**
 * Extract referral code from URL path
 */
export const extractReferralCodeFromPath = (pathname: string): string | null => {
  const match = pathname.match(/^\/referral\/([^/]+)$/);
  return match ? match[1] : null;
};

/**
 * Check if current URL is a referral link
 */
export const isReferralLink = (pathname: string): boolean => {
  return pathname.startsWith('/referral/');
};

/**
 * Get referral code from current URL
 */
export const getReferralCodeFromUrl = (): string | null => {
  return extractReferralCodeFromPath(window.location.pathname);
};
