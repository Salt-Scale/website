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

function sanitize(input: string | undefined): string {
	if (!input) return '';
	return String(input).slice(0, 5000);
}

export const POST: APIRoute = async ({ request, cookies }) => {
	try {
		const contentType = request.headers.get('content-type') || '';
		if (!contentType.includes('application/json')) {
			return new Response(JSON.stringify({ error: 'Unsupported content type' }), { status: 415 });
		}

		const body = (await request.json()) as ContactPayload;

		// Honeypot
		if (body['bot-field']) {
			return new Response(JSON.stringify({ ok: true }), { status: 200 });
		}

		const name = sanitize(body.name);
		const email = sanitize(body.email);
		const message = sanitize(body.message);

		if (!name || !isValidEmail(email) || !message) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		// Basic rate limit: 1 per 30s per client
		const clientKey = cookies.get('cfrm')?.value;
		if (clientKey) {
			return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
		}
		cookies.set('cfrm', '1', { httpOnly: true, path: '/', maxAge: 30 });

		// Prepare payload
		const payload = {
			name,
			email,
			company: sanitize(body.company),
			phone: sanitize(body.phone),
			platform: sanitize(body.platform),
			projectType: sanitize(body['project-type']),
			timeline: sanitize(body.timeline),
			budget: sanitize(body.budget),
			message,
			additional: sanitize(body.additional),
		};

		// Optional email via Resend
		const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
		const CONTACT_TO = import.meta.env.CONTACT_TO;
		const CONTACT_FROM = import.meta.env.CONTACT_FROM || 'no-reply@' + (new URL(import.meta.env.SITE_URL || 'https://example.com')).hostname;

		if (RESEND_API_KEY && CONTACT_TO) {
			const subject = `New Contact: ${payload.name}`;
			const text = Object.entries(payload)
				.map(([k, v]) => `${k}: ${v || ''}`)
				.join('\n');
			const resp = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${RESEND_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ from: CONTACT_FROM, to: CONTACT_TO, subject, text }),
			});
			if (!resp.ok) {
				console.error('Resend error', await resp.text());
			}
		}

		return new Response(JSON.stringify({ ok: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
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
