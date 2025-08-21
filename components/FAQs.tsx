'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type QA = { q: string; a: string };

export default function FAQs() {
  const t = useTranslations('faqs');
  const [open, setOpen] = useState<number | null>(0);
  const list = t.raw('list') as QA[];

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{t('title')}</h2>
          <p className="mt-2 text-white/70">{t('subtitle')}</p>
        </div>

        <div className="grid gap-3">
          {list.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={i} className="card">
                <button
                  className="w-full text-start font-semibold"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  {f.q}
                </button>
                {isOpen && (
                  <p id={panelId} className="mt-2 text-white/80">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
