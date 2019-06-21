import React from 'react';

import { MdDocs } from '../../docs/src/modules/components/md';
import content from '../../docs/src/pages/guides/api/api.md';

/**
 *
 * Note: Option (!!) - does not look at the global web-pack loader
 * option (test) to handle file extentions
 * import content from '!!raw-loader!../../docs/src/pages/guides/api/api.md';
 *
 * as raw-loader is defined in the web-pack configuration to handle .md files
 * import content from "../../docs/src/pages/guides/api/api.md";
 *
 */

const Page = () => {
  return <MdDocs content={content} />;
};

export default Page;
