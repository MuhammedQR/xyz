import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  // TODO: integrate with email service (e.g., SES/Resend/SMTP)
  console.log('Contact form submission:', body);
  return NextResponse.json({ ok: true, message: 'شكرًا لتواصلك معنا، سنعود إليك قريبًا.' });
}
