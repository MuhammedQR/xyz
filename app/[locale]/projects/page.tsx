export const dynamic = 'force-static';

import { getTranslations } from 'next-intl/server';

type Project = { title: string; location: string; year: string; summary: string };

export default async function ProjectsPage({
  params: { locale }
}: { params: { locale: 'ar' | 'en' } }) {
  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = t.raw('list') as Project[];

  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="text-3xl md:text-4xl font-semibold">{t('title')}</h1>
        <div className="grid gap-6 mt-6">
          {projects.map((p, i) => (
            <div key={i} className="card">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <div className="text-sm text-white/70">
                  {p.location} • {p.year}
                </div>
              </div>
              <p className="mt-2 text-white/80">{p.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
