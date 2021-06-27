import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

const cache = createCache({ key: 'css', prepend: true });
cache.compat = true;

const {
  extractCritical,
  extractCriticalToChunks,
  constructStyleTagsFromChunks
} = createEmotionServer(cache);

export {
  extractCritical,
  extractCriticalToChunks,
  constructStyleTagsFromChunks,
  cache
};
