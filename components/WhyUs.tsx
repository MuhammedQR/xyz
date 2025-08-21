// components/WhyUs.tsx
'use client';
import { useTranslations } from 'next-intl';

type Item = { h: string; p: string };

export default function WhyUs() {
  const t = useTranslations('why');
  const items = t.raw('items') as Item[];

  return (
    <section className="section">
      <div className="container-narrow">
        {/* إن أردت إظهار عنوان القسم */}
        {/* <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">{t('title')}</h2> */}

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="card">
              <h3 className="text-xl font-semibold">{item.h}</h3>
              <p className="mt-2 text-white/80">{item.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
