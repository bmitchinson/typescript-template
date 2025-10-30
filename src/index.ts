import { returnBen } from './utils/returnBen';
import { HELLO } from './configuration';

console.log(returnBen());
console.log('config Value:', HELLO);

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Hello</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>Served with Bun</p>
  </body>
</html>`;

const server = Bun.serve({
    fetch(request: Request) {
        try {
            const url = new URL(request.url);
            if (request.method === 'GET' && url.pathname === '/') {
                return new Response(html, {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/html; charset=utf-8',
                    },
                });
            }

            // 404 for any other route
            return new Response('Not Found', { status: 404 });
        } catch (err) {
            // Return 500 on unexpected errors
            return new Response('Internal Server Error', { status: 500 });
        }
    },
    port: 3000,
});

console.log(`Server running on http://localhost:${server.port}/`);
