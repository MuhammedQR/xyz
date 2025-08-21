'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form) as any);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setOk(json?.message ?? 'تم الإرسال');
    setLoading(false);
    form.reset();
  }

  return (
    <section className="section">
      <div className="container-narrow">
        <h1 className="text-3xl md:text-4xl font-semibold">تواصل معنا</h1>
        <p className="mt-2 text-white/80">املأ النموذج وسيتواصل معك فريقنا قريبًا.</p>
        <form onSubmit={submit} className="card mt-6 grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="name" required placeholder="الاسم" className="bg-transparent border border-white/20 rounded-xl px-4 py-3" />
            <input name="email" required type="email" placeholder="البريد الإلكتروني" className="bg-transparent border border-white/20 rounded-xl px-4 py-3" />
          </div>
          <input name="phone" placeholder="رقم الهاتف (اختياري)" className="bg-transparent border border-white/20 rounded-xl px-4 py-3" />
          <textarea name="message" required placeholder="رسالتك" rows={5} className="bg-transparent border border-white/20 rounded-xl px-4 py-3" />
          <button disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? 'جارٍ الإرسال...' : 'إرسال'}
          </button>
          {ok && <p className="text-green-300">{ok}</p>}
        </form>
      </div>
    </section>
  );
}
