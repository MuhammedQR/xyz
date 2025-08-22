export const dynamic = 'force-static';

import { getTranslations } from 'next-intl/server';

type Svc = { title: string; desc: string };

export default async function ServicesPage({
  params: { locale }
}: { params: { locale: 'ar' | 'en' } }) {
  const t = await getTranslations({ locale, namespace: 'servicesPage' });
  const items = t.raw('items') as Svc[];

  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="text-3xl md:text-4xl font-semibold">{t('title')}</h1>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {items.map((s, i) => (
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
