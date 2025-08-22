'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{type:'ok'|'err'; text:string} | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setNotice(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form) as any);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ...data, locale })
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setNotice({ type: 'ok', text: json?.message || t('sent') });
        form.reset();
      } else {
        setNotice({ type: 'err', text: json?.message || t('error') });
      }
    } catch {
      setNotice({ type: 'err', text: t('error') });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="text-3xl md:text-4xl font-semibold">{t('title')}</h1>
        <p className="mt-2 text-white/80">{t('intro')}</p>

        <form onSubmit={submit} className="card mt-6 grid gap-4" noValidate>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="sr-only" htmlFor="name">{t('name')}</label>
            <input id="name" name="name" required autoComplete="name"
              placeholder={t('name')}
              className="bg-transparent border border-white/20 rounded-xl px-4 py-3" />

            <label className="sr-only" htmlFor="email">{t('email')}</label>
            <input id="email" name="email" required type="email" autoComplete="email"
              placeholder={t('email')}
              className="bg-transparent border border-white/20 rounded-xl px-4 py-3" />
          </div>

          <label className="sr-only" htmlFor="phone">{t('phone')}</label>
          <input id="phone" name="phone" inputMode="tel" autoComplete="tel"
            placeholder={t('phone')}
            className="bg-transparent border border-white/20 rounded-xl px-4 py-3" />

          <label className="sr-only" htmlFor="message">{t('message')}</label>
          <textarea id="message" name="message" required rows={5}
            placeholder={t('message')}
            className="bg-transparent border border-white/20 rounded-xl px-4 py-3" />

          <button disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? t('sending') : t('send')}
          </button>

          {notice && (
            <p role="status" aria-live="polite"
               className={notice.type === 'ok' ? 'text-green-300' : 'text-red-300'}>
              {notice.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
