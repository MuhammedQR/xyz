'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';
import { useTranslations } from 'next-intl';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  // استخراج اللغة الحالية من المسار (/ar/... أو /en/...)
  const segments = pathname.split('/');
  const locale = segments[1] === 'en' ? 'en' : 'ar';

  // دالة لبناء الروابط مع الاحتفاظ بالـ locale
  const linkWithLocale = (path: string) =>
    path === '/' ? `/${locale}` : `/${locale}${path}`;

  // تبديل اللغة
  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const switchPath = `/${otherLocale}${segments.slice(2).join('/') ? '/' + segments.slice(2).join('/') : ''}`;

  const nav = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/projects', label: t('projects') },
    { href: '/contact', label: t('contact') }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#0b1220]/70 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* شعار الشركة */}
        <Link href={`/${locale}`} className="text-lg font-semibold">
          شركة <span className="text-brand-400">XYZ</span>
        </Link>

        {/* روابط التنقل */}
        <nav className="flex items-center gap-3 md:gap-6">
          {nav.map((item) => {
            const href = linkWithLocale(item.href);
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "text-sm md:text-base hover:text-brand-300 transition",
                  pathname === href && "text-brand-300"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          {/* زر CTA */}
          <Link href={linkWithLocale('/contact')} className="btn-primary text-sm">
            {t('quote')}
          </Link>

          {/* زر تبديل اللغة */}
          <Link href={switchPath} className="ml-4 text-sm underline hover:text-brand-300">
            {t('lang')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
