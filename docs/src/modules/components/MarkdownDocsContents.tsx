/* eslint-disable no-underscore-dangle */
import { useHoux } from 'houx';
import kebabCase from 'lodash/kebabCase';
import { Router } from 'next/router';

import { RootState } from '../redux/reducers';
import { getContents, getHeaders } from '../utils/parseMarkdown';

interface ChildrenInput {
  contents: string;
  markdownLocation: string;
}

interface MarkdownDocsContentsProps {
  children: (children: ChildrenInput) => JSX.Element;
  markdownLocation?: string;
  markdown: string;
}

const MarkdownDocsContents = (props: MarkdownDocsContentsProps) => {
  const { children, markdownLocation: markdownLocationProp, markdown } = props;
  const contents = getContents(markdown);
  const headers = getHeaders(markdown);

  const {
    state: {
      navigation: { activePage }
    }
  }: { state: RootState } = useHoux();

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

  // const { components } = headers;

  if (headers.components.length > 0) {
    const section = markdownLocation.split('/')[4];
    contents.push(`
## API
${headers.components
  .map(
    component =>
      `- [&lt;${component} /&gt;](${
        section === 'lab' ? '/lab/api' : '/api'
      }/${Router._rewriteUrlForNextExport(kebabCase(component))})`
  )
  .join('\n')}
  `);
  }

  return children({ contents, markdownLocation });
};

export default MarkdownDocsContents;
