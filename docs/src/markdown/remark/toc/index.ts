import { Transformer } from 'unified';

import { Options, transform } from './transform';

// const attacher = (processor: Processor, options?: Options): Transformer => {
//   return transform({ maxDepth: 3, tight: false });
// };

const attacher = (options?: Options): Transformer => {
  return transform({ maxDepth: 3, tight: false });
};

export default attacher;
