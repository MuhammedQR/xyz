'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="section relative overflow-hidden">
      {/* الخلفية */}
      <div className="absolute inset-0 -z-10">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#009fe6"/>
              <stop offset="100%" stopColor="#002a3d"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#g)" />
          <g stroke="white" strokeOpacity="0.1">
            {[...Array(20)].map((_, i) => (
              <line key={i} x1="0" y1={i*30} x2="1200" y2={i*25} />
            ))}
          </g>
        </svg>
      </div>

      {/* المحتوى */}
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* النصوص */}
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              {t.rich('title', {
                highlight: (chunks) => <span className="text-brand-300">{chunks}</span>
              })}
            </h1>
            <p className="mt-4 text-white/80 max-w-xl">{t('subtitle')}</p>
            <div className="mt-8 flex gap-3">
              <Link href="/contact" className="btn-primary">
                {t('contact')}
              </Link>
              <Link href="/projects" className="btn-outline">
                {t('projects')}
              </Link>
            </div>
          </div>

          {/* بطاقة الخدمات */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">{t('servicesTitle')}</h3>
            <ul className="space-y-2 text-white/80 list-disc pr-5 rtl:pr-0 rtl:pl-5">
              {(t.raw('services') as string[]).map((service, idx) => (
                <li key={idx}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
