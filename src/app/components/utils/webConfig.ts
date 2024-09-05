export const webConfig = {
  isProduction: process.env.APP_ENV === 'production',
  basePath: process.env.CODE_REROUTE_BASE_PATH || '',
  sendEmailBaseUrl:
    process.env.SEND_EMAIL_BASE_URL ||
    'https://temurih-mail.netlify.app/.netlify/functions/api',
  // 'http://localhost:9000/.netlify/functions/api',
  gaTrackingId: process.env.GA_TRACKING_ID,
};
