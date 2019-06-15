import React from 'react';

import MDXDocs from '../../../../docs/src/modules/components/mdx/MDXDocs';
import content, { ast, headingsMap, meta, raw } from '../../../../docs/src/pages/pidp/approach/byExample/index.mdx';

// Webpack - explicit call loaders

// import content, {
//   meta,
//   ast,
//   headingsMap,
//   raw
// } from "!!babel-loader!../../webpack/loader/mdx-custom-loader!../../docs/src/pages/guides/mdx/byExample.mdx";

// Webpack lazy - dynamic imports

// const lazyContent = import(
//   /* webpackPrefetch: true, webpackChunkName: "src-components-doc-dynamic" */ "../../docs/src/pages/guides/mdx/byExample.mdx"
// )
//   .then(({ code, meta, ast, headingsMap, raw }) => {
//     <MDXDocsRaw content={code} meta={meta} ast={ast} headingsMap={headingsMap} raw={raw} />;
//   })
//   .catch(error => {});
//

// React lazy

// NextJs lazy next/dynamic

const Page = () => {
  return <MDXDocs content={content} meta={meta} ast={ast} headingsMap={headingsMap} raw={raw} />;
  // return lazyContent;
};

export default Page;
