import React, { Fragment } from 'react';
import remarkParse from 'remark-parse';
import remarkToReact from 'remark-react';
import remarkSlug from 'remark-slug';
import unified from 'unified';

import remarkMinNodes from '../../remark/minNodes';
import remarkToc from '../../remark/toc';
import TocLink from './TocLink';

export const generateProcessor = (activeState: Set<string>) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkSlug)
    .use(remarkMinNodes)
    .use(remarkToc)
    .use(remarkToReact, {
      sanitize: true,
      fragment: Fragment,
      remarkReactComponents: {
        a: props => {
          return <TocLink activeState={activeState} {...props} />;
        }
      }
    });
  return processor;
};
