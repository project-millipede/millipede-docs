import { PageTypes } from '@app/types';

import { getContents, getHeaders } from '../utils/parseMarkdown';

interface MarkdownDocsContentsProps {
  markdownLocation?: string;
  markdown?: string;
  activePage: PageTypes.Page;
}

const useMarkdownDocsContents = ({
  markdownLocation: markdownLocationProp,
  markdown,
  activePage = { pathname: '' }
}: MarkdownDocsContentsProps) => {
  const contents = getContents(markdown);
  const headers = getHeaders(markdown);

  const { pathname } = activePage;

  let markdownLocation = markdownLocationProp || pathname;

  if (!markdownLocationProp) {
    const token = markdownLocation.split('/');
    token.push(token[token.length - 1]);
    markdownLocation = token.join('/');

    if (headers.filename) {
      markdownLocation = headers.filename;
    } else {
      markdownLocation = `/docs/src/pages${markdownLocation}.md`;
    }
  }

  //   if (headers.components.length > 0) {
  //     const section = markdownLocation.split('/')[4];
  //     contents.push(`
  // ## API
  // ${headers.components
  //   .map(
  //     component =>
  //       `- [&lt;${component} /&gt;](${
  //         section === 'lab' ? '/lab/api' : '/api'
  //       }/${Router._rewriteUrlForNextExport(kebabCase(component))})`
  //   )
  //   .join('\n')}
  //   `);
  //   }

  return { contents, markdownLocation };
};

export default useMarkdownDocsContents;
