import React from 'react';
import remarkParse from 'remark-parse';
import remarkToReact from 'remark-react';
import remarkSlug from 'remark-slug';
import unified from 'unified';

import Counter from './components/Counter';
import remarkMinNodes from './remark/minNodes';
import remarkToc from './remark/toc';

export const processAndRender = async (callback: (value: string) => void, activeState: string) => {
  const processor = await unified()
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
          console.log("a", props);
          return (
            <Counter initialvalue={10} callback={callback} activeState={activeState} {...props} />
          );
        }
        // ul: props => (
        //   <Counter
        //     initialvalue={10}
        //     callback={callback}
        //     activeState={activeState}
        //     secondary={false}
        //     {...props}
        //   />
        // ),
        // li: props => (
        //   <Counter
        //     initialvalue={10}
        //     callback={callback}
        //     activeState={activeState}
        //     secondary={true}
        //     {...props}
        //   />
        // )
      }
    });
  return processor;
};
