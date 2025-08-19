import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
	const site = (import.meta.env.SITE_URL || 'https://example.com').replace(/\/?$/, '');
	const body = `# robots.txt
User-agent: *
Allow: /
Sitemap: ${site}/sitemap-index.xml
Sitemap: ${site}/sitemap.xml
`;

	return new Response(body, {
		status: 200,
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};


