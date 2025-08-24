'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useMemo } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);

  // ✅ استخدم raw لأن الرسالة تحتوي HTML
  const titleHTML = (t.raw('title') as string) || '';
  const hasHTML = useMemo(() => /<\s*\w+[^>]*>/.test(titleHTML), [titleHTML]);

  const services = (Array.isArray(t.raw('services')) ? (t.raw('services') as string[]) : []) as string[];

  const badges = useMemo(() => ['ISO 9001', 'ISO 14001', 'ISO 45001', 'API & ASME'], []);

  return (
    <section className="section relative overflow-hidden">
      {/* خلفية زخرفية خفيفة */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#009fe6" />
              <stop offset="100%" stopColor="#002a3d" />
            </linearGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#g)" />
          <g stroke="white" strokeOpacity="0.09">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1="0" y1={i * 30} x2="1200" y2={i * 25} />
            ))}
          </g>
        </svg>
      </div>

      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* النصوص */}
          <div>
            {hasHTML ? (
              <h1
                className="text-3xl md:text-5xl font-semibold leading-tight"
                dangerouslySetInnerHTML={{ __html: titleHTML }}
              />
            ) : (
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{titleHTML}</h1>
            )}

            <p className="mt-4 text-white/80 max-w-xl">{t('subtitle')}</p>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
              {badges.map((b) => (
                <span key={b} className="px-2 py-1 rounded-md border border-white/15 bg-white/5">
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link href={withLocale('/contact')} className="btn-primary">
                {t('contact')}
              </Link>
              <Link href={withLocale('/projects')} className="btn-outline">
                {t('projects')}
              </Link>
            </div>
          </div>

          {/* بطاقة خدمات مختصرة */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">{t('servicesTitle')}</h3>
            <ul className="space-y-2 text-white/80 list-disc pr-5 rtl:pr-0 rtl:pl-5">
              {services.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>

            {/* مقاييس سريعة */}
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { k: '15+', v: locale === 'ar' ? 'سنة خبرة' : 'Years' },
                { k: '60+', v: locale === 'ar' ? 'مشاريع' : 'Projects' },
                { k: '98%', v: locale === 'ar' ? 'رضا' : 'Satisfaction' }
              ].map((x) => (
                <div key={x.v} className="rounded-xl border border-white/10 bg-white/5 py-3">
                  <div className="text-2xl font-bold text-brand-300">{x.k}</div>
                  <div className="text-xs text-white/70 mt-1">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
