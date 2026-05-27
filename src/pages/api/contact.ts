import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  ['project-type']?: string;
  message?: string;
  ['bot-field']?: string;
}

const SERVICE_LABELS: Record<string, string> = {
  'business-websites': 'Websites for service businesses',
  'shopify-development': 'Shopify development',
  'adobe-commerce': 'Adobe Commerce',
  'headless-commerce': 'Headless commerce',
  'custom-app-development': 'Custom app development',
  'integrations-automation': 'Integrations & automation',
  'audits-strategy': 'Audits & strategy',
  other: 'Other / not sure yet',
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
  'new-build': 'New website build',
  redesign: 'Redesign of existing site',
  migration: 'Platform migration',
  'custom-app': 'Custom app development',
  headless: 'Headless commerce',
  integration: 'Systems integration',
  audit: 'Technical audit',
  consulting: 'Strategy consulting',
  other: 'Other',
};

// Vercel function timeout default is 10s; cap Resend at 8s so we still
// have time to log + return a clean 502.
const RESEND_TIMEOUT_MS = 8000;

// Rate-limit window. Set AFTER a successful or honeypot submit only —
// transient Resend failures shouldn't lock the user out.
const RATE_LIMIT_SECONDS = 30;

function isValidEmail(value: string): boolean {
  // Loose-but-not-permissive: requires non-empty local + host + TLD with no
  // whitespace. Resend rejects truly bad addresses; this just keeps obvious
  // junk out of the inbox.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  const normalized = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits;
  return normalized.length === 10;
}

// Field-specific length caps. Long-form fields (message, additional) get the
// full 5000 char budget; short fields get tight caps so a malicious POST can't
// bloat the email subject or HTML body.
const FIELD_CAPS = {
  short: 200,
  medium: 500,
  long: 5000,
} as const;

function sanitize(input: string | undefined, cap: number = FIELD_CAPS.long): string {
  if (!input) return '';
  return String(input).slice(0, cap).trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Format a slug as Title Case if SERVICE_LABELS/PROJECT_TYPE_LABELS mapping is missing.
function humanize(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function labelFor(map: Record<string, string>, value: string): string {
  if (!value) return '';
  return map[value] ?? humanize(value);
}

// CORS allowlist. In dev we echo any origin so localhost works without
// ceremony; in prod we only echo origins that match the canonical apex,
// the `www.` variant, or a Vercel preview deploy.
const PROD_ORIGIN_ALLOWLIST = [
  'https://saltandscale.consulting',
  'https://www.saltandscale.consulting',
];
const PROD_ORIGIN_REGEX = /^https:\/\/[a-z0-9-]+\.vercel\.app$/;

function resolveAllowedOrigin(requestOrigin: string | null): string {
  if (!import.meta.env.PROD) return requestOrigin || '*';
  if (!requestOrigin) return PROD_ORIGIN_ALLOWLIST[0];
  if (PROD_ORIGIN_ALLOWLIST.includes(requestOrigin)) return requestOrigin;
  if (PROD_ORIGIN_REGEX.test(requestOrigin)) return requestOrigin;
  return PROD_ORIGIN_ALLOWLIST[0];
}

function json(body: unknown, status = 200, requestOrigin: string | null = null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': resolveAllowedOrigin(requestOrigin),
      Vary: 'Origin',
    },
  });
}

function setRateLimitCookie(cookies: import('astro').AstroCookies): void {
  cookies.set('cfrm', '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: RATE_LIMIT_SECONDS,
    // `secure` breaks localhost dev (no HTTPS). Vercel preview + prod are HTTPS.
    secure: import.meta.env.PROD,
  });
}

function buildEmailHtml(payload: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  projectType: string;
  message: string;
}): string {
  const rows: Array<[string, string]> = [
    ['Name', payload.name],
    ['Email', payload.email],
    ['Company', payload.company],
    ['Phone', payload.phone],
    ['Service', labelFor(SERVICE_LABELS, payload.service)],
    ['Project type', labelFor(PROJECT_TYPE_LABELS, payload.projectType)],
  ].filter(([, v]) => Boolean(v));

  const detailRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:14px 16px;border-bottom:1px solid #e8e2d0;width:140px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8e5f22;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:14px 16px;border-bottom:1px solid #e8e2d0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#2A2F35;line-height:1.55;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  const messageBlock = payload.message
    ? `
      <div style="padding:24px;background:#F7F1E1;border-left:3px solid #C8893E;margin:0 0 16px;">
        <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8e5f22;font-weight:600;">Project details</p>
        <p style="margin:0;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#2A2F35;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
      </div>`
    : '';

  // mailto: needs URI-encoding on the address (HTML-escape only protects the visible text)
  const mailtoHref = `mailto:${encodeURIComponent(payload.email)}`;

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F1E1;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F7F1E1;">
    <tr>
      <td style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #e8e2d0;">

          <!-- Header bar -->
          <tr>
            <td style="background:#373E45;padding:24px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#C8893E;font-weight:600;">— New project inquiry</p>
                    <p style="margin:6px 0 0;font-family:Georgia,serif;font-size:22px;color:#F7F1E1;font-weight:600;">Salt &amp; Scale</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:32px 32px 16px;">
              <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;line-height:1.25;color:#2A2F35;font-weight:600;">From ${escapeHtml(payload.name)}${payload.company ? ` at <span style="font-style:italic;color:#8e5f22;">${escapeHtml(payload.company)}</span>` : ''}</p>
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#6B7280;">Reply directly to this email to respond — it will go to <a href="${mailtoHref}" style="color:#8e5f22;">${escapeHtml(payload.email)}</a>.</p>
            </td>
          </tr>

          <!-- Message block -->
          ${messageBlock ? `<tr><td style="padding:8px 32px 0;">${messageBlock}</td></tr>` : ''}

          <!-- Details table -->
          <tr>
            <td style="padding:8px 32px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
                ${detailRows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px;border-top:1px solid #e8e2d0;">
              <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#9A938A;line-height:1.5;">
                Sent from the contact form on <a href="https://saltandscale.consulting/contact/" style="color:#8e5f22;text-decoration:none;">saltandscale.consulting</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(payload: Record<string, string>): string {
  const lines: string[] = [
    'NEW PROJECT INQUIRY — Salt & Scale',
    '',
    `From: ${payload.name}`,
    `Email: ${payload.email}`,
  ];
  if (payload.company) lines.push(`Company: ${payload.company}`);
  if (payload.phone) lines.push(`Phone: ${payload.phone}`);
  if (payload.service) lines.push(`Service: ${labelFor(SERVICE_LABELS, payload.service)}`);
  if (payload.projectType) lines.push(`Project type: ${labelFor(PROJECT_TYPE_LABELS, payload.projectType)}`);
  lines.push('');
  if (payload.message) {
    lines.push('--- Project details ---');
    lines.push(payload.message);
    lines.push('');
  }
  lines.push('Reply to this email to respond directly.');
  return lines.join('\n');
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  const origin = request.headers.get('origin');
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return json({ error: 'Unsupported content type' }, 415, origin);
    }

    const body = (await request.json()) as ContactPayload;

    // Honeypot — silent 200 so we don't signal the trap. Also set the
    // rate-limit cookie here so bots can't spam-probe cheaply.
    if (body['bot-field']) {
      setRateLimitCookie(cookies);
      return json({ ok: true }, 200, origin);
    }

    // Rate limit check (BEFORE expensive work like Resend call).
    if (cookies.get('cfrm')?.value) {
      return json({ error: 'Too many requests' }, 429, origin);
    }

    const payload = {
      name: sanitize(body.name, FIELD_CAPS.short),
      email: sanitize(body.email, FIELD_CAPS.short),
      company: sanitize(body.company, FIELD_CAPS.short),
      phone: sanitize(body.phone, FIELD_CAPS.short),
      service: sanitize(body.service, FIELD_CAPS.short),
      projectType: sanitize(body['project-type'], FIELD_CAPS.short),
      message: sanitize(body.message, FIELD_CAPS.long),
    };

    // Required fields
    const missing: string[] = [];
    if (!payload.name) missing.push('name');
    if (!payload.email) missing.push('email');
    if (!payload.message) missing.push('message');
    if (missing.length > 0) {
      return json({ error: `Missing required fields: ${missing.join(', ')}` }, 400, origin);
    }

    // Format validation. A failed format check is still a "submit attempt,"
    // so we set the rate-limit cookie to keep an attacker from cheaply
    // probing the validator.
    const invalid: string[] = [];
    if (!isValidEmail(payload.email)) invalid.push('email');
    if (payload.phone && !isValidPhone(payload.phone)) invalid.push('phone');
    if (invalid.length > 0) {
      setRateLimitCookie(cookies);
      return json({ error: `Invalid fields: ${invalid.join(', ')}` }, 422, origin);
    }

    // Resend config
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    const CONTACT_TO = import.meta.env.CONTACT_TO;
    const CONTACT_FROM =
      import.meta.env.CONTACT_FROM ||
      'Salt & Scale Website <hello@saltandscale.consulting>';

    if (!RESEND_API_KEY || !CONTACT_TO) {
      console.error('[contact] missing RESEND_API_KEY or CONTACT_TO');
      return json({ error: 'Email service not configured' }, 503, origin);
    }

    const resend = new Resend(RESEND_API_KEY);

    const subjectCompany = payload.company ? ` / ${payload.company}` : '';
    const subject = `New project inquiry: ${payload.name}${subjectCompany}`;

    let result: Awaited<ReturnType<typeof resend.emails.send>>;
    try {
      result = await withTimeout(
        resend.emails.send({
          from: CONTACT_FROM,
          to: CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
          replyTo: payload.email,
          subject,
          html: buildEmailHtml(payload),
          text: buildEmailText(payload),
        }),
        RESEND_TIMEOUT_MS,
        'Resend',
      );
    } catch (err) {
      console.error('[contact] Resend timeout or network error:', err);
      // No rate-limit cookie — let the user retry immediately.
      return json({ error: 'Failed to send email' }, 502, origin);
    }

    if (result.error) {
      console.error('[contact] Resend API error:', result.error);
      // No rate-limit cookie — Resend reported error, retry is fine.
      return json({ error: 'Failed to send email' }, 502, origin);
    }

    // Success path: set rate-limit cookie now so the user can't spam-submit.
    setRateLimitCookie(cookies);
    console.log('[contact] sent', { id: result.data?.id, from: clientAddress });
    return json({ ok: true }, 200, origin);
  } catch (err) {
    console.error('[contact] server error:', err);
    return json({ error: 'Server error' }, 500, origin);
  }
};

// CORS preflight
export const OPTIONS: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin');
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': resolveAllowedOrigin(origin),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    },
  });
};
