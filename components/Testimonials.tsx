'use client';
import { useTranslations } from 'next-intl';

type Testimonial = { n: string; q: string };

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{t('title')}</h2>
          <p className="mt-2 text-white/70">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, idx) => (
            <figure key={idx} className="card">
              <blockquote className="text-white/90">“{it.q}”</blockquote>
              <figcaption className="mt-3 text-white/60">— {it.n}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
