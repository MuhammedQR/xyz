'use client';
import { useTranslations } from 'next-intl';

type Item = { h: string; p: string };

export default function Industries() {
  const t = useTranslations('industries');
  const items = t.raw('items') as Item[];

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{t('title')}</h2>
          <p className="mt-2 text-white/70">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((x, i) => (
            <div key={i} className="card">
              <h3 className="text-xl font-semibold">{x.h}</h3>
              <p className="mt-2 text-white/80">{x.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
