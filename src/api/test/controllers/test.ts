import { factories } from '@strapi/strapi';

const EXTERNAL_API_URL =
  'https://mtq3676inh.execute-api.me-south-1.amazonaws.com/dev/test';

export default factories.createCoreController(
  'api::test.test',
  () => ({
    async page(ctx) {
      ctx.type = 'text/html';
      ctx.body = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Strapi Test API Page</title>
  </head>
  <body>
    <main>
      <h1>External API Test</h1>
      <p>Endpoint: <code>${EXTERNAL_API_URL}</code></p>
      <form method="GET" action="/api/test/external" target="resultFrame">
        <button type="submit">Load API Data</button>
      </form>
      <p>The response appears below:</p>
      <iframe
        title="API response"
        name="resultFrame"
        src="about:blank"
        width="100%"
        height="500"
      ></iframe>
    </main>
  </body>
</html>`;
    },

    async external(ctx) {
      try {
        const response = await fetch(EXTERNAL_API_URL);
        const text = await response.text();

        ctx.status = response.status;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            ctx.body = JSON.parse(text);
            return;
          } catch {
            // Fall through to plain text response when JSON parse fails.
          }
        }

        ctx.type = contentType || 'text/plain';
        ctx.body = text;
      } catch (error) {
        ctx.status = 502;
        ctx.body = {
          error: 'Failed to fetch external API',
          detail: error instanceof Error ? error.message : String(error),
        };
      }
    },
  })
);
