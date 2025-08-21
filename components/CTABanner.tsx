'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function CTABanner() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full opacity-10 bg-gradient-to-br from-brand-500 to-brand-900" />
      </div>
      <div className="container-narrow text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">{t('title')}</h2>
        <p className="mt-2 text-white/80 max-w-2xl mx-auto">{t('desc')}</p>
        <div className="mt-6">
          <Link href={`/${locale}/contact`} className="btn-primary">
            {t('btn')}
          </Link>
        </div>
      </div>
    </section>
  );
}
