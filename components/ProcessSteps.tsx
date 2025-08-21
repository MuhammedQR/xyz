'use client';
import { useTranslations } from 'next-intl';

type Step = { n: string; t: string; d: string };

export default function ProcessSteps() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{t('title')}</h2>
          <p className="mt-2 text-white/70">{t('subtitle')}</p>
        </div>

        <ol className="space-y-4" aria-label={t('title')}>
          {steps.map((s, i) => (
            <li key={i} className="card">
              <div className="flex items-start gap-4">
                <div className="text-brand-300 font-bold shrink-0">{s.n}</div>
                <div>
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="mt-1 text-white/80">{s.d}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
