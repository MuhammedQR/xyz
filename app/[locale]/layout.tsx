import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// استورد هيدر/فوتر ومقدمات SEO والخلفية إن وجدت
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOProvider from "@/components/SEOProvider";
import HeroFX from "@/components/HeroFX";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  icons: { icon: "/favicon.ico" },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: "ar" | "en" };
}) {
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        {/* <SEOProvider /> */}
        {/* خلفية تفاعلية (اختياري) */}
        <HeroFX />
        <div className="relative z-10">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
