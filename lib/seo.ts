// lib/seo.ts
export const SITE_URL = process.env.SITE_URL || 'https://yourdomain.com';

export function localizedUrl(path: string, locale: 'ar'|'en') {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${p === '/ar' || p === '/en' ? '' : p}`;
}
