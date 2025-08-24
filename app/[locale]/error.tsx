// app/[locale]/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');
  const locale = useLocale();

  useEffect(() => {
    // سجّل الخطأ (يظهر في المتصفح وعلى Vercel Logs إن وُجد console capture)
    console.error('App error:', error);
  }, [error]);

  return (
    <section className="section">
      <div className="container-narrow text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">{t('title')}</h1>
        <p className="mt-2 text-white/80">{t('desc')}</p>

        {/* رقم تتبع الخطأ (اختياري) */}
        {error?.digest && (
          <p className="mt-1 text-xs text-white/40">#{error.digest}</p>
        )}

        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => reset()} className="btn-primary">
            {t('retry')}
          </button>
          <Link href={`/${locale}`} className="btn-outline">
            {t('home')}
          </Link>
        </div>
      </div>
    </section>
  );
}
