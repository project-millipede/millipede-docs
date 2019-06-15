import React from 'react';

import MDXDocs from '../../../../docs/src/modules/components/mdx/MDXDocs';
import content, { ast, headingsMap, meta, raw } from '../../../../docs/src/pages/common/dataflow/comparison/index.mdx';

const Page = () => {
  return <MDXDocs content={content} meta={meta} ast={ast} headingsMap={headingsMap} raw={raw} />;
};

export default Page;
