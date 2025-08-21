// next-intl.config.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const supported = ['ar', 'en'] as const;
  const l = supported.includes(locale as any) ? (locale as 'ar' | 'en') : 'ar';

  return {
    locale: l,
    messages: (await import(`./messages/${l}.json`)).default
  };
});
