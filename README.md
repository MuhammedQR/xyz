# Oil Facilities Company Website (Next.js 14, App Router)

Arabic-first, RTL-friendly website for an oil & gas facilities company. Includes SEO (next-seo), sitemap/robots (next-sitemap), Tailwind, and a simple contact API route.

## Quick Start

```bash
npm i
npm run dev
```

## Build

```bash
npm run build
```

On build, `next-sitemap` will generate `sitemap.xml` and `robots.txt`.

## Configure

- Update `next-seo.config.ts` (titles, description, site URL).
- Set `SITE_URL` env var in production for correct sitemap links.
- Replace branding and content in `/app` pages.
- Add images to `/public/images` and update OG image `/public/og-image.png`.

## Deploy
- Recommended: Vercel.
- Ensure `SITE_URL` is set in the project environment variables.
