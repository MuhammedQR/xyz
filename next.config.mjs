/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
// const withNextIntl = createNextIntlPlugin('./next-intl.config.ts');

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default createNextIntlPlugin('./next-intl.config.ts')({});
