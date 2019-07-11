import express from 'express';
import nextI18NextMiddleware from 'next-i18next/middleware';
import next from 'next/dist/server/next';

import nextI18next from '../i18n';

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  // use the next-i18next middleware with our i18n configuration
  try {
    server.use(nextI18NextMiddleware(nextI18next));
  } catch (e) {
    throw e;
  }

  // handle nextjs routing
  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`🚀 Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
