import React from 'react';

import { MdxDocs } from '../../../../docs/src/modules/components/mdx';
import content, { ast, headingsMap, meta, raw } from '../../../../docs/src/pages/common/dataflow/comparison/index.mdx';

const Page = () => {
  return <MdxDocs content={content} meta={meta} ast={ast} headingsMap={headingsMap} raw={raw} />;
};

export default Page;
