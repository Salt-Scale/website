import type { APIRoute } from 'astro';

export const prerender = false;

// Server-side proxy for the footer's daily verse.
//
// Why this exists: fetching the verse client-side leaked every visitor's IP
// and user-agent to a third-party API on every page load. Moving the fetch
// to a same-origin route keeps visitor data on our infrastructure and lets
// us cache the upstream response at the Vercel edge so most page loads cost
// zero serverless invocations.
//
// Cache strategy:
//   - s-maxage=21600  (6h): the edge serves the cached payload for 6 hours.
//   - stale-while-revalidate=86400 (24h): if the cache expires and upstream
//     is unavailable, the edge keeps serving the last good response while
//     we refresh in the background.
// Net effect: ~one upstream fetch per Vercel POP every 6 hours, regardless
// of visitor traffic.

const UPSTREAM = 'https://beta.ourmanna.com/api/v1/get/?format=json&order=daily';
const FETCH_TIMEOUT_MS = 4000;

interface OurMannaResponse {
  verse?: {
    details?: { text?: string; reference?: string };
  };
}

const errorResponse = (status: number, body: Record<string, unknown>): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      // Don't cache failures — we want the next visitor to try again, not
      // see a 30-minute black hole because the first request happened to
      // race a 30-second upstream blip.
      'Cache-Control': 'no-store',
    },
  });

export const GET: APIRoute = async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const upstream = await fetch(UPSTREAM, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (!upstream.ok) {
      console.error('[sotd] upstream non-2xx:', upstream.status);
      return errorResponse(502, { error: 'upstream' });
    }

    const data = (await upstream.json()) as OurMannaResponse;
    const text = data?.verse?.details?.text?.trim() ?? '';
    const reference = data?.verse?.details?.reference?.trim() ?? '';

    if (!text) {
      console.error('[sotd] upstream returned empty verse');
      return errorResponse(502, { error: 'empty' });
    }

    return new Response(JSON.stringify({ text, reference }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    console.error('[sotd] fetch failed:', err);
    return errorResponse(502, { error: 'fetch_failed' });
  } finally {
    clearTimeout(timer);
  }
};
