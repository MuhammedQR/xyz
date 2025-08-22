// /SEOProvider.tsx
type Props = { locale: 'ar' | 'en' };

export default function SEOProvider({ locale }: Props) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';
  const name = locale === 'ar' ? 'شركة XYZ للمنشآت النفطية' : 'XYZ Oil Facilities Co.';
  const desc =
    locale === 'ar'
      ? 'حلول متكاملة في هندسة وبناء وتشغيل منشآت النفط والغاز وفق أعلى معايير السلامة.'
      : 'Integrated EPC, O&M and HSE for oil & gas facilities.';

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url: base,
    logo: `${base}/favicon.ico`,
    sameAs: []
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: base,
    inLanguage: locale,
    description: desc
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
