import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | شركة XYZ للمنشآت النفطية',
  defaultTitle: 'شركة XYZ – منشآت النفط والغاز',
  description:
    'شركة XYZ تقدم حلول إنشاء وتشغيل وصيانة منشآت النفط والغاز وفق أعلى معايير السلامة والجودة.',
  openGraph: {
    type: 'website',
    locale: 'ar_AE',
    url: 'https://yourdomain.com',
    siteName: 'شركة XYZ',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'شركة XYZ' }]
  },
  additionalMetaTags: [
    { name: 'theme-color', content: '#009fe6' }
  ],
  twitter: {
    cardType: 'summary_large_image'
  }
};

export default config;
