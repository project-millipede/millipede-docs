import { TOCOptions } from 'mdast-util-toc';
import { Transformer } from 'unified';

import { transform } from './transform';

// const attacher = (processor: Processor, options?: Options): Transformer => {
//   return transform({ maxDepth: 3, tight: false });
// };

const attacher = (_options?: TOCOptions): Transformer => {
  return transform({ maxDepth: 3, tight: false });
};

export default attacher;
