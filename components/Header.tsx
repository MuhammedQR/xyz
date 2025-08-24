'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState, useEffect, useRef } from 'react';
import cn from 'classnames';

type TopItem = {
  href?: string;
  i18n: string;             // مفتاح الترجمة
  children?: { href: string; i18n: string }[];
};

export default function Header() {
  const t = useTranslations('nav');
  const tSvc = useTranslations('nav.servicesMenu');
  const locale = useLocale(); // ar | en
  const pathname = usePathname() || `/${locale}`;
  const search = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null); // للخدمات (Desktop)
  const navRef = useRef<HTMLDivElement | null>(null);

  // عناصر القائمة
  const items: TopItem[] = useMemo(
    () => [
      { href: '/', i18n: 'home' },
      { href: '/about', i18n: 'about' },
      {
        i18n: 'services',
        children: [
          { href: '/services#epc', i18n: 'epc' },
          { href: '/services#om', i18n: 'om' },
          { href: '/services#hse', i18n: 'hse' },
          { href: '/services#pipelines', i18n: 'pipelines' },
          { href: '/services#scada', i18n: 'scada' },
          { href: '/services#supply', i18n: 'supply' }
        ]
      },
      { href: '/projects', i18n: 'projects' },
      { href: '/contact', i18n: 'contact' }
    ],
    []
  );

  const withLocale = (path: string, l = locale) =>
    path === '/' ? `/${l}` : `/${l}${path}`;

  const isActive = (target: string) =>
    pathname === target || pathname.startsWith(target + '/');

  // مسار تبديل اللغة مع الحفاظ على الصفحة والـ query
  const other = locale === 'ar' ? 'en' : 'ar';
  const restPath = pathname.split('/').slice(2).join('/');
  const basePath = restPath ? `/${restPath}` : '/';
  const qs = search.toString();
  const switchHref = withLocale(basePath, other) + (qs ? `?${qs}` : '');

  // إغلاق قوائم الديسكتوب عند الضغط خارجها
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-50 border-b border-white/10',
      'backdrop-blur bg-[#0b1220]/70'
    )}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* الشعار */}
        <Link href={withLocale('/')} className="text-lg font-semibold">
          شركة <span className="text-brand-400">XYZ</span>
        </Link>

        {/* زر الموبايل */}
        <button
          className="md:hidden p-2 rounded-lg border border-white/10 hover:bg-white/5"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
        >
          {!mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>

        {/* روابط سطح المكتب */}
        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-3 md:gap-6"
          aria-label="Main"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {items.map((item) => {
            // عنصر بسيط بدون أطفال
            if (!item.children?.length) {
              const href = withLocale(item.href || '/');
              return (
                <Link
                  key={item.i18n}
                  href={href}
                  className={cn(
                    'text-sm md:text-base transition hover:text-brand-300',
                    isActive(href) && 'text-brand-300'
                  )}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {t(item.i18n as any)}
                </Link>
              );
            }

            // عنصر بقائمة منسدلة (الخدمات)
            return (
              <div
                key={item.i18n}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.i18n)}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === item.i18n}
                  onClick={() => setOpenMenu(v => v === item.i18n ? null : item.i18n)}
                  className={cn(
                    'text-sm md:text-base transition hover:text-brand-300 flex items-center gap-1'
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setOpenMenu(null);
                  }}
                >
                  {t(item.i18n as any)}
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <path d="M7 10l5 5 5-5" fill="currentColor" />
                  </svg>
                </button>

                {openMenu === item.i18n && (
                  <div
                    role="menu"
                    className={cn(
                      'absolute mt-3 min-w-56 rounded-xl border border-white/10 bg-[#0b1220]/95 backdrop-blur p-2',
                      locale === 'ar' ? 'right-0' : 'left-0',
                      'shadow-xl'
                    )}
                  >
                    {item.children.map((c) => {
                      const href = withLocale(c.href);
                      return (
                        <Link
                          key={c.href}
                          href={href}
                          className={cn(
                            'block px-3 py-2 rounded-lg hover:bg-white/5',
                            isActive(href) && 'text-brand-300'
                          )}
                          role="menuitem"
                          onClick={() => setOpenMenu(null)}
                        >
                          {tSvc(c.i18n as any)}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* زر CTA */}
          <Link href={withLocale('/contact')} className="btn-primary text-sm">
            {t('quote')}
          </Link>

          {/* تبديل اللغة */}
          <Link href={switchHref} className="ml-4 text-sm underline hover:text-brand-300">
            {t('lang')}
          </Link>
        </nav>
      </div>

      {/* قائمة الموبايل */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0b1220]/90 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {items.map((item) => {
              if (!item.children?.length) {
                const href = withLocale(item.href || '/');
                const active = isActive(href);
                return (
                  <Link
                    key={item.i18n}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn('py-2', active ? 'text-brand-300 font-medium' : 'text-white/80 hover:text-white')}
                    aria-current={active ? 'page' : undefined}
                  >
                    {t(item.i18n as any)}
                  </Link>
                );
              }
              // نسخة Accordion للخدمات
              return <MobileServices key="services" t={t} tSvc={tSvc} locale={locale} withLocale={withLocale} onClose={() => setMobileOpen(false)} />;
            })}

            <div className="flex items-center gap-3 pt-2">
              <Link
                href={withLocale('/contact')}
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-sm grow text-center"
              >
                {t('quote')}
              </Link>
              <Link
                href={switchHref}
                onClick={() => setMobileOpen(false)}
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

function MobileServices({
  t, tSvc, locale, withLocale, onClose
}: {
  t: ReturnType<typeof useTranslations>;
  tSvc: ReturnType<typeof useTranslations>;
  locale: 'ar'|'en';
  withLocale: (p: string, l?: string) => string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const items = [
    { href: '/services#epc', key: 'epc' },
    { href: '/services#om', key: 'om' },
    { href: '/services#hse', key: 'hse' },
    { href: '/services#pipelines', key: 'pipelines' },
    { href: '/services#scada', key: 'scada' },
    { href: '/services#supply', key: 'supply' }
  ];
  return (
    <div className="py-2">
      <button
        className="w-full text-start flex items-center justify-between py-2"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span>{t('services')}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" className={cn(open && 'rotate-180 transition')}>
          <path d="M7 10l5 5 5-5" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className="ps-3 mt-1 space-y-1">
          {items.map(i => (
            <Link
              key={i.key}
              href={withLocale(i.href, locale)}
              onClick={onClose}
              className="block py-2 text-white/80 hover:text-white"
            >
              {tSvc(i.key as any)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
