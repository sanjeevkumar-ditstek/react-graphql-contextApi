export default function getBaseUrl() {
  if (process.env.DOMAIN_BASE_URL) return process.env.DOMAIN_BASE_URL;
  return 'https://app.yourdomain.com';
}
