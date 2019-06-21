// import { Heading } from 'docs/src/markdown/processAndRenderContentLoader';
import React from 'react';
import remarkToReact from 'remark-react';
import remarkSlug from 'remark-slug';

export const options = {
  options: {
    remarkPlugins: [
      remarkSlug,
      [
        remarkToReact,
        {
          fragment: React.Fragment,
          sanitize: { clobberPrefix: '' }, // remove 'user-content' string from generated ids
          remarkReactComponents: {
            h2: props => {
              // return <Heading component={'h2'} {...props} />;
              return <div />;
            },
            h3: props => {
              // return <Heading component={'h3'} {...props} />;
              return <div />;
            }
          }
        }
      ]
    ]
  }
};

export default options;
