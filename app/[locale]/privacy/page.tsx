import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-static';

export default async function PrivacyPage({
  params: { locale }
}: {
  params: { locale: 'ar' | 'en' }
}) {
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="text-3xl md:text-4xl font-semibold">{t('title')}</h1>
        <p className="mt-4 text-white/80">{t('intro')}</p>
      </div>
    </section>
  );
}
