// src/pages/api/contact.ts
import type { APIRoute } from 'astro';

interface ContactPayload {
	name?: string;
	email?: string;
	company?: string;
	phone?: string;
	platform?: string;
	['project-type']?: string;
	timeline?: string;
	budget?: string;
	message?: string;
	additional?: string;
	['bot-field']?: string;
}

function isValidEmail(value: string | undefined): boolean {
	if (!value) return false;
	return /.+@.+\..+/.test(value);
}

function isValidPhone(value: string | undefined): boolean {
	if (!value) return false;
	const digits = String(value).replace(/\D/g, '');
	return digits.length === 10;
}

function sanitize(input: string | undefined): string {
	if (!input) return '';
	return String(input).slice(0, 5000);
}

function json(body: unknown, status = 200): Response {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	};
	return new Response(JSON.stringify(body), { status, headers });
}

export const POST: APIRoute = async ({ request, cookies }) => {
	try {
		const contentType = request.headers.get('content-type') || '';
		if (!contentType.includes('application/json')) {
			return json({ error: 'Unsupported content type' }, 415);
		}

		const body = (await request.json()) as ContactPayload;

		// Honeypot
		if (body['bot-field']) {
			return json({ ok: true }, 200);
		}

		const name = sanitize(body.name);
		const email = sanitize(body.email);
		const company = sanitize(body.company);
		const phone = sanitize(body.phone);
		const message = sanitize(body.message);

		// Required fields check
		const missing: string[] = [];
		if (!name) missing.push('name');
		if (!email) missing.push('email');
		if (!company) missing.push('company');
		if (!phone) missing.push('phone');
		if (!message) missing.push('message');
		if (missing.length > 0) {
			return json({ error: `Missing required fields: ${missing.join(', ')}` }, 400);
		}

		// Format validation
		const invalid: string[] = [];
		if (!isValidEmail(email)) invalid.push('email');
		if (!isValidPhone(phone)) invalid.push('phone');
		if (invalid.length > 0) {
			return json({ error: `Invalid fields: ${invalid.join(', ')}` }, 422);
		}

		// Basic rate limit: 1 per 30s per client
		const clientKey = cookies.get('cfrm')?.value;
		if (clientKey) {
			return json({ error: 'Too many requests' }, 429);
		}
		cookies.set('cfrm', '1', { httpOnly: true, path: '/', maxAge: 30 });

		// Prepare payload
		const payload = {
			name,
			email,
			company: sanitize(body.company),
			phone,
			platform: sanitize(body.platform),
			projectType: sanitize(body['project-type']),
			timeline: sanitize(body.timeline),
			budget: sanitize(body.budget),
			message,
			additional: sanitize(body.additional),
		};

		// Email via Resend (sends both text and HTML)
		const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
		const CONTACT_TO = import.meta.env.CONTACT_TO;
		const CONTACT_FROM = import.meta.env.CONTACT_FROM || 'no-reply@' + (new URL(import.meta.env.SITE_URL || 'https://example.com')).hostname;

		// If email service is not configured, fail explicitly so client shows an error
		if (!RESEND_API_KEY || !CONTACT_TO) {
			return json({ error: 'Email service not configured' }, 503);
		}

		const subject = `New Contact: ${payload.name}`;
		const text = Object.entries(payload)
			.map(([k, v]) => `${k}: ${v || ''}`)
			.join('\n');

		const html = `
		  <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.55;color:#111827">
		    <h2 style="margin:0 0 12px;font-size:18px;color:#0f172a">New Contact</h2>
		    <p style="margin:0 0 16px;color:#334155">You received a new inquiry from the website.</p>
		    <table style="border-collapse:collapse;width:100%;max-width:640px;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px">
		      <tbody>
		        ${Object.entries(payload).map(([k,v]) => `
		          <tr>
		            <td style=\"padding:10px 12px;border-bottom:1px solid #f1f5f9;width:160px;color:#64748b;text-transform:capitalize\">${k.replace(/([A-Z])/g,' $1')}</td>
		            <td style=\"padding:10px 12px;border-bottom:1px solid #f1f5f9;color:#0f172a\">${(v || '').toString().replace(/</g,'&lt;')}</td>
		          </tr>`).join('')}
		      </tbody>
		    </table>
		  </div>`;

		const resp = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ from: CONTACT_FROM, to: CONTACT_TO, subject, text, html, reply_to: payload.email }),
		});

		if (!resp.ok) {
			const errText = await resp.text().catch(() => '');
			console.error('Resend error', resp.status, errText);
			return json({ error: 'Failed to send email' }, 502);
		}

		return json({ ok: true }, 200);
	} catch (err) {
		return json({ error: 'Server error' }, 500);
	}
};

// Allow CORS preflight / health checks
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
