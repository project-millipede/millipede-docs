import React from 'react';
import remarkParse from 'remark-parse';
import remarkToReact from 'remark-react';
import remarkSlug from 'remark-slug';
import unified from 'unified';

import remarkMinNodes from '../../remark/minNodes';
import remarkToc from '../../remark/toc';
import TocLink from './TocLink';

export const generateProcessor = (
  activeState: Set<string>,
  scrollToLink?: (href: string) => void
) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkSlug)
    // .use(remarkTitle)
    .use(remarkMinNodes)
    .use(remarkToc)
    .use(remarkToReact, {
      // sanitize: true,
      fragment: React.Fragment,
      remarkReactComponents: {
        // Redefining the anchor element overrides the results generated in a
        // before executed effort of remark-slug to produce anchor elements
        a: props => {
          return (
            <TocLink
              initialvalue={10}
              activeState={activeState}
              scrollToLink={scrollToLink}
              {...props}
            />
          );
        },

        // ul: props => (
        //   <TocLink
        //     initialvalue={10}
        //     activeState={activeState}
        //     scrollToLink={scrollToLink}
        //     secondary={false}
        //     {...props}
        //   />
        // ),
        // li: props => (
        //   <TocLink
        //     initialvalue={10}
        //     activeState={activeState}
        //     scrollToLink={scrollToLink}
        //     secondary={true}
        //     {...props}
        //   />
        // )

        h5: props => (
          <TocLink
            initialvalue={10}
            activeState={activeState}
            scrollToLink={scrollToLink}
            secondary={false}
            {...props}
          />
        )
      }
    });
  return processor;
};
