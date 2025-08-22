// app/[locale]/about/page.tsx
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Timeline from '@/components/Timeline';
import type { Metadata } from 'next';
import { SITE_URL, localizedUrl } from '@/lib/seo';

export async function generateMetadata({ params:{locale} }:{params:{locale:'ar'|'en'}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace:'about'});
  const path = '/about';
  return {
    title: t('title'),
    description: t('intro'),
    alternates: {
      canonical: localizedUrl(path, locale),
      languages: {
        ar: localizedUrl(path,'ar'),
        en: localizedUrl(path,'en')
      }
    },
    openGraph: {
      url: localizedUrl(path, locale),
      title: t('title'),
      description: t('intro'),
      siteName: 'XYZ Oil Facilities',
      images: [{ url: '/images/about-hero.jpg', width: 1600, height: 600 }]
    },
    twitter: { card: 'summary_large_image' }
  };
}
export const dynamic = 'force-static';

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: 'ar' | 'en' }
}) {
  // مرّر locale + namespace بشكل صريح
  const t = await getTranslations({ locale, namespace: 'about' });

  const cards = t.raw('items') as { h: string; p: string }[];
  const events = t.raw('timeline') as { year: string; title: string; text: string }[];

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="relative aspect-[16/6] overflow-hidden rounded-2xl border border-white/10 mb-8">
          <Image
            src="" // تأكد وجودها
            alt={t('imageAlt')}
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold">{t('title')}</h1>
        <p className="mt-4 text-white/80">{t('intro')}</p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {cards.map((x) => (
            <div key={x.h} className="card">
              <h3 className="text-xl font-semibold">{x.h}</h3>
              <p className="mt-2 text-white/80">{x.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">{t('timelineTitle')}</h2>
          <p className="mt-2 text-white/70">{t('timelineIntro')}</p>
        </div>
        <Timeline events={events} />
      </div>
    </section>
  );
}
