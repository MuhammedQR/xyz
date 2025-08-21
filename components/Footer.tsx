"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-10 text-sm text-white/70 grid gap-4 md:grid-cols-2">
        {/* النصوص */}
        <div>
          <p>
            © {new Date().getFullYear()} {t("company")}. {t("rights")}
          </p>
        </div>

        {/* الروابط */}
        <div className="md:text-end space-x-4 rtl:space-x-reverse">
          <Link href={`/${locale}/privacy`} className="hover:text-white/90">
            {t("privacy")}
          </Link>
          <Link href="/sitemap.xml" className="hover:text-white/90">
            {t("sitemap")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
