/**
 * POST /api/prijava
 *
 * Prima JSON sa podacima o prijavi štete i šalje email putem SMTP-a
 * (Google Workspace nalog marko.jankovic@proceniteljstete.rs).
 *
 * Env variables (postaviti na Vercel Dashboard → Project Settings → Environment Variables):
 *   SMTP_HOST     - smtp.gmail.com
 *   SMTP_PORT     - 465
 *   SMTP_USER     - marko.jankovic@proceniteljstete.rs (Google Workspace mailbox)
 *   SMTP_PASS     - App Password (NE obična lozinka - generisana iz Google Account
 *                   Settings → Security → App passwords. 16 znakova bez razmaka.)
 *   MAIL_TO       - marko.jankovic@proceniteljstete.rs (gde stiže prijava)
 *   MAIL_FROM     - "Damage Expert <marko.jankovic@proceniteljstete.rs>"
 *   MAIL_CC       - (opciono) dodatni email za kopiju, npr. ilijajovanovic.biz@gmail.com
 *
 * Format request body:
 *   {
 *     fullName, phone, email, city, isUrgent,
 *     damageType, brand, model, year, km, damagedParts[],
 *     damageDescription, insurance, hasPoliceReport,
 *     photoCount  // koliko fotografija je korisnik selektovao u browseru
 *   }
 *
 * Fotke se NE šalju ovom rutom - korisnik ih šalje preko WhatsApp/Viber
 * (file upload preko Next.js API route bi zahtevao paid Vercel jer free
 * tier ima 4.5MB body limit, a 8 slika može lako preći 30MB).
 */
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ClaimPayload {
  // Korak 1 - kontakt (obavezno)
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  isUrgent?: boolean;
  // Korak 2 - tip štete
  damageType?: string;
  damageTypeLabel?: string;
  // Korak 3 - vozilo
  brand?: string;
  model?: string;
  year?: string;
  km?: string;
  insurance?: string;
  hasPoliceReport?: boolean;
  // Korak 4 - oštećeni delovi
  damagedParts?: string[];
  damageDescription?: string;
  // Korak 5 - foto info
  photoCount?: number;
  // Meta
  partial?: boolean; // true ako forma nije do kraja popunjena (lead capture)
}

function escapeHtml(s: string | undefined | null): string {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(data: ClaimPayload): string {
  const urgent = data.isUrgent
    ? '<div style="background:#FF6A00;color:#fff;padding:12px 16px;border-radius:8px;font-weight:bold;margin-bottom:16px;">🚨 HITAN SLUČAJ - klijent traži zapisnik istog dana</div>'
    : '';
  const partial = data.partial
    ? '<div style="background:#FEF3C7;color:#92400E;padding:12px 16px;border-radius:8px;font-weight:bold;margin-bottom:16px;">⚠️ NEPOTPUNA PRIJAVA - klijent nije završio sve korake, kontaktirati za dopunu</div>'
    : '';

  const row = (label: string, val: string | undefined | null) =>
    val
      ? `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:200px;">${escapeHtml(
          label
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${escapeHtml(
          val
        )}</td></tr>`
      : '';

  const partsList =
    data.damagedParts && data.damagedParts.length
      ? `<ul style="margin:8px 0;padding-left:20px;">${data.damagedParts
          .map((p) => `<li style="margin-bottom:4px;">${escapeHtml(p)}</li>`)
          .join('')}</ul>`
      : '<i style="color:#999;">nije naveden ni jedan deo</i>';

  return `
<!DOCTYPE html>
<html lang="sr">
<head>
<meta charset="utf-8">
<title>Nova prijava štete</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;background:#f5f5f5;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
    <div style="background:#0A0A0A;color:#fff;padding:24px;">
      <div style="color:#FF6A00;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;font-weight:bold;">Nova prijava štete</div>
      <div style="font-size:24px;font-weight:800;">Damage Expert</div>
      <div style="color:#999;font-size:13px;margin-top:4px;">proceniteljstete.rs</div>
    </div>
    <div style="padding:24px;">
      ${urgent}
      ${partial}

      <h3 style="font-size:14px;text-transform:uppercase;color:#FF6A00;letter-spacing:1.5px;margin:0 0 8px 0;">Klijent</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${row('Ime i prezime', data.fullName)}
        ${row('Telefon', data.phone)}
        ${row('Email', data.email)}
        ${row('Grad', data.city)}
      </table>

      <h3 style="font-size:14px;text-transform:uppercase;color:#FF6A00;letter-spacing:1.5px;margin:0 0 8px 0;">Vozilo i šteta</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        ${row('Tip štete', data.damageTypeLabel || data.damageType)}
        ${row('Marka', data.brand)}
        ${row('Model', data.model)}
        ${row('Godište', data.year)}
        ${row('Kilometraža', data.km)}
        ${row('Osiguranje', data.insurance)}
        ${row('Policijski zapisnik', data.hasPoliceReport ? 'Da' : '')}
      </table>

      <h3 style="font-size:14px;text-transform:uppercase;color:#FF6A00;letter-spacing:1.5px;margin:0 0 8px 0;">Oštećeni delovi</h3>
      ${partsList}

      ${
        data.damageDescription
          ? `<h3 style="font-size:14px;text-transform:uppercase;color:#FF6A00;letter-spacing:1.5px;margin:24px 0 8px 0;">Opis klijenta</h3><div style="padding:12px;background:#f9f9f9;border-left:3px solid #FF6A00;border-radius:4px;font-style:italic;color:#444;">${escapeHtml(
              data.damageDescription
            )}</div>`
          : ''
      }

      <h3 style="font-size:14px;text-transform:uppercase;color:#FF6A00;letter-spacing:1.5px;margin:24px 0 8px 0;">Foto</h3>
      <p style="margin:0;color:#666;">Klijent je u browseru selektovao <strong>${
        data.photoCount || 0
      }</strong> fotografije. Treba ga kontaktirati da pošalje fotografije preko WhatsApp ili Viber-a na +381 64 11 18 914.</p>

      <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;text-align:center;">
        <a href="tel:${escapeHtml(data.phone)}" style="display:inline-block;background:#FF6A00;color:#fff;padding:12px 24px;border-radius:24px;text-decoration:none;font-weight:bold;margin:0 4px;">📞 Pozovi klijenta</a>
        <a href="https://wa.me/${(data.phone || '').replace(
          /[^0-9]/g,
          ''
        )}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:24px;text-decoration:none;font-weight:bold;margin:0 4px;">💬 WhatsApp</a>
      </div>

      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;color:#999;font-size:11px;text-align:center;">
        Prijava primljena automatski preko forme na proceniteljstete.rs<br>
        ${new Date().toLocaleString('sr-RS', { timeZone: 'Europe/Belgrade' })}
      </div>
    </div>
  </div>
</body>
</html>`;
}

function buildText(data: ClaimPayload): string {
  return [
    'NOVA PRIJAVA ŠTETE - Damage Expert',
    data.isUrgent ? '\n🚨 HITAN SLUČAJ - zapisnik istog dana' : '',
    data.partial ? '\n⚠️ NEPOTPUNA PRIJAVA - kontaktirati za dopunu' : '',
    '',
    `Ime: ${data.fullName || ''}`,
    `Telefon: ${data.phone || ''}`,
    data.email ? `Email: ${data.email}` : '',
    data.city ? `Grad: ${data.city}` : '',
    '',
    `Tip štete: ${data.damageTypeLabel || data.damageType || ''}`,
    `Vozilo: ${[data.brand, data.model, data.year].filter(Boolean).join(' ')}`,
    data.km ? `KM: ${data.km}` : '',
    data.insurance ? `Osiguranje: ${data.insurance}` : '',
    data.hasPoliceReport ? 'Ima policijski zapisnik' : '',
    '',
    `Oštećeni delovi: ${(data.damagedParts || []).join(', ') || '-'}`,
    data.damageDescription ? `Opis: ${data.damageDescription}` : '',
    '',
    `Foto: ${data.photoCount || 0} (klijent šalje preko WhatsApp/Viber)`,
    '',
    `Primljeno: ${new Date().toLocaleString('sr-RS', { timeZone: 'Europe/Belgrade' })}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as ClaimPayload;

    // Basic validation - bar ime i telefon
    if (!data.fullName || !data.phone) {
      return NextResponse.json(
        { ok: false, error: 'Ime i telefon su obavezni' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const mailTo = process.env.MAIL_TO || user;
    const mailFrom = process.env.MAIL_FROM || (user ? `"Damage Expert" <${user}>` : '');
    const mailCc = process.env.MAIL_CC;

    if (!host || !user || !pass) {
      // SMTP još nije konfigurisan - vrati success ali loguj upozorenje.
      // Klijent svejedno dobija fallback (WhatsApp/Viber/mailto link).
      console.warn('[/api/prijava] SMTP env vars nisu setovani - email neće biti poslat.');
      return NextResponse.json({
        ok: true,
        warning: 'SMTP nije konfigurisan - email nije poslat',
        fallback: true,
      });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const urgentTag = data.isUrgent ? '🚨 HITNO - ' : '';
    const partialTag = data.partial ? '⏳ NEPOTPUNA - ' : '';
    const subject = `${urgentTag}${partialTag}Prijava štete: ${data.fullName} (${data.phone})`;

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      cc: mailCc || undefined,
      replyTo: data.email || undefined,
      subject,
      text: buildText(data),
      html: buildHtml(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/prijava] Error:', message);
    // Ipak vrati success da klijent ima fallback flow - log greška za Vercel logs.
    return NextResponse.json({ ok: false, error: message, fallback: true }, { status: 500 });
  }
}
