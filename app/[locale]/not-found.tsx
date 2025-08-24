import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function RootNotFound() {
  const locale = await getLocale().catch(() => 'ar');
  const t = await getTranslations({ locale, namespace: 'notFound' }).catch(() => ({
    t: (key: string) =>
      locale === 'ar'
        ? (key === 'title' ? 'الصفحة غير موجودة' :
           key === 'desc' ? 'قد تكون الصفحة نُقلت أو حُذفت.' :
           key === 'home' ? 'العودة للرئيسية' : 'تواصل معنا')
        : (key === 'title' ? 'Page not found' :
           key === 'desc' ? 'The page may have been moved or deleted.' :
           key === 'home' ? 'Back to Home' : 'Contact Us')
  }) as any);

  return (
    <section className="section">
      <div className="container-narrow text-center">
        <div className="text-5xl font-bold">404</div>
        <h1 className="mt-2 text-2xl md:text-3xl font-semibold">{t('title')}</h1>
        <p className="mt-2 text-white/80">{t('desc')}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href={`/${locale}`} className="btn-primary">{t('home')}</Link>
          <Link href={`/${locale}/contact`} className="btn-outline">{t('contact')}</Link>
        </div>
      </div>
    </section>
  );
}
