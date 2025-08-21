// components/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: 'ar' | 'en') => {
    if (!pathname) return;

    const segments = pathname.split('/');
    segments[1] = next; // بدّل أول جزء (اللغة)

    const newPath = segments.join('/') || `/${next}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => switchTo('ar')}
        className={locale === 'ar' ? 'underline font-semibold' : 'opacity-70 hover:opacity-100'}
      >
        العربية
      </button>
      <span className="opacity-40">/</span>
      <button
        onClick={() => switchTo('en')}
        className={locale === 'en' ? 'underline font-semibold' : 'opacity-70 hover:opacity-100'}
      >
        English
      </button>
    </div>
  );
}
