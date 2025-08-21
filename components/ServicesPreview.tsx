'use client';
import { useTranslations } from 'next-intl';

type Service = { title: string; desc: string };

export default function ServicesPreview() {
  const t = useTranslations('services');
  const services = t.raw('items') as Service[];

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{t('title')}</h2>
          <p className="mt-2 text-white/70">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="card">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
