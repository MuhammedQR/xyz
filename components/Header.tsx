'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import cn from 'classnames';

type Item = { href: '/' | '/about' | '/services' | '/projects' | '/contact'; label: string };

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale(); // ar | en
  const pathname = usePathname() || `/${locale}`;
  const search = useSearchParams();

  const [open, setOpen] = useState(false);

  const nav: Item[] = useMemo(
    () => ([
      { href: '/', label: t('home') },
      { href: '/about', label: t('about') },
      { href: '/services', label: t('services') },
      { href: '/projects', label: t('projects') },
      { href: '/contact', label: t('contact') }
    ]),
    [t]
  );

  // يبني رابط مع بادئة اللغة
  const withLocale = (path: Item['href'] | string, l = locale) =>
    path === '/' ? `/${l}` : `/${l}${path}`;

  // يحدد الرابط الفعّال (يدعم الصفحات الفرعية)
  const isActive = (target: string) =>
    pathname === target || pathname.startsWith(target + '/');

  // مسار تبديل اللغة مع الحفاظ على نفس الصفحة ومعاملات الاستعلام
  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const restPath = pathname.split('/').slice(2).join('/'); // بعد /{locale}
  const basePath = restPath ? `/${restPath}` : '/';
  const qs = search.toString();
  const switchHref = withLocale(basePath, otherLocale) + (qs ? `?${qs}` : '');

  // إغلاق قائمة الموبايل عند التنقل
  const closeMobile = () => setOpen(false);

  return (
    <header className={cn(
      'sticky top-0 z-50 border-b border-white/10',
      'backdrop-blur bg-[#0b1220]/70'
    )}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* الشعار */}
        <Link href={withLocale('/')} className="text-lg font-semibold">
          {/* يمكنك استبدال النص باللوغو لاحقًا */}
          شركة <span className="text-brand-400">XYZ</span>
        </Link>

        {/* أزرار الموبايل */}
        <button
          className="md:hidden p-2 rounded-lg border border-white/10 hover:bg-white/5"
          aria-label="Toggle navigation"
          onClick={() => setOpen(v => !v)}
        >
          {!open ? (
            // أيقونة Hamburger
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            // أيقونة إغلاق
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>

        {/* روابط سطح المكتب */}
        <nav className="hidden md:flex items-center gap-3 md:gap-6" aria-label="Main">
          {nav.map((item) => {
            const href = withLocale(item.href);
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  'text-sm md:text-base transition hover:text-brand-300',
                  isActive(href) && 'text-brand-300'
                )}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          {/* زر CTA */}
          <Link href={withLocale('/contact')} className="btn-primary text-sm">
            {t('quote')}
          </Link>

          {/* زر تبديل اللغة */}
          <Link href={switchHref} className="ml-4 text-sm underline hover:text-brand-300">
            {t('lang')}
          </Link>
        </nav>
      </div>

      {/* قائمة الموبايل المنسدلة */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0b1220]/90 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => {
              const href = withLocale(item.href);
              const active = isActive(href);
              return (
                <Link
                  key={item.href}
                  href={href}
                  onClick={closeMobile}
                  className={cn(
                    'py-2',
                    active ? 'text-brand-300 font-medium' : 'text-white/80 hover:text-white'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="flex items-center gap-3 pt-2">
              <Link
                href={withLocale('/contact')}
                onClick={closeMobile}
                className="btn-primary text-sm grow text-center"
              >
                {t('quote')}
              </Link>
              <Link
                href={switchHref}
                onClick={closeMobile}
                className="text-sm underline hover:text-brand-300"
              >
                {t('lang')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
