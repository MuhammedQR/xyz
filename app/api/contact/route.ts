import { NextResponse } from 'next/server';

const WINDOW_MS = 60_000; // 1 دقيقة
const LIMIT = 5;
const bucket = new Map<string, {count:number; ts:number}>();

async function verifyTurnstile(token?: string) {
  if (!token) return false;
  const secret = process.env.TURNSTILE_SECRET_KEY!;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token })
  });
  const json = await res.json();
  return !!json.success;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anon';
  const now = Date.now();
  const info = bucket.get(ip) || { count: 0, ts: now };
  if (now - info.ts > WINDOW_MS) { info.count = 0; info.ts = now; }
  if (++info.count > LIMIT) {
    bucket.set(ip, info);
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
  }
  bucket.set(ip, info);

  const body = await req.json().catch(()=> ({}));
  const okCaptcha = await verifyTurnstile(body['cf-turnstile-response']);
  if (!okCaptcha) return NextResponse.json({ message: 'Captcha failed' }, { status: 400 });

  const { name, email, phone, message, locale } = body;

  // TODO: أرسل الرسالة إلى بريدك/CRM (SendGrid, Resend, SES, HubSpot, ...)
  // placeholder:
  console.log('CONTACT', { name, email, phone, message, locale });

  const msg = locale === 'ar'
    ? 'تم الإرسال بنجاح. سنعود إليك قريبًا.'
    : 'Submitted successfully. We’ll be in touch soon.';
  return NextResponse.json({ message: msg }, { status: 200 });
}
