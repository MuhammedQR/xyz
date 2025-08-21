'use client';
import { useTranslations } from 'next-intl';

export default function Stats() {
  const t = useTranslations('stats');

  const stats = [
    { k: '15+', v: t('years') },
    { k: '60+', v: t('projects') },
    { k: '98%', v: t('satisfaction') },
    { k: '0',   v: t('incidents') }
  ] as const;

  return (
    <section className="section">
      <div className="container-narrow grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.v} className="card text-center" aria-label={s.v}>
            <div className="text-3xl md:text-4xl font-bold text-brand-300">{s.k}</div>
            <div className="mt-1 text-white/80">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
