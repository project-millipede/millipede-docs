import React, { useEffect, useState } from 'react';
import markdownToRemarkPlugin from 'remark-parse';
import remarkToReact from 'remark-react';
import remarkSlug from 'remark-slug';
import unified from 'unified';

import { InteractiveHead } from '../../../markdown/components/head';

export const generateProcessor = () => {
  const processor = unified()
    .use(markdownToRemarkPlugin)
    .use(remarkSlug)
    .use(remarkToReact, {
      fragment: React.Fragment,
      sanitize: { clobberPrefix: '' }, // remove 'user-content' string from generated ids
      remarkReactComponents: {
        h2: props => {
          return <InteractiveHead component={'h2'} {...props} />;
        },
        h3: props => {
          return <InteractiveHead component={'h3'} {...props} />;
        }
      }
    });
  return processor;
};
