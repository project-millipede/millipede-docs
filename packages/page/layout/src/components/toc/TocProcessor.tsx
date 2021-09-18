import remarkExtractToc from '@stefanprobst/remark-extract-toc';
import remarkParse from 'remark-parse';
import remarkSlug from 'remark-slug';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

export const generateProcessor = () => {
  return unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(remarkExtractToc)
    .use(remarkStringify);
};
