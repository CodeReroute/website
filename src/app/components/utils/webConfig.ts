export const webConfig = {
  isProduction: process.env.APP_ENV === 'production',
  basePath: process.env.CODE_REROUTE_BASE_PATH || '',
  assetBaseUrl: process.env.ASSET_BASE_URL || '',
  nextPublicBaseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
  recaptchaV3Key: process.env.NEXT_PUBLIC_RECAPTCHAV3KEY || '',
  sendEmailBaseUrl:
    process.env.SEND_EMAIL_BASE_URL ||
    'https://code-reroute-send-emails.netlify.app/.netlify/functions/api',
  // 'http://localhost:9000/.netlify/functions/api',
  gaTrackingId: process.env.GA_TRACKING_ID || 'G-0X44NP833E',
};