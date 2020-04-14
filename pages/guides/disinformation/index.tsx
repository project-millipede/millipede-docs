import React, { FC } from 'react';

import MDXContentLoader, { MDXContentLoaderProps } from '../../../docs/src/modules/components/loader/MDXContentLoader';

type Props = MDXContentLoaderProps;

const Page: FC<Props> = ({ path }) => {
  return <MDXContentLoader path={path} />;
};

// Page.defaultProps = {
//   path: '/guides/disinformation/'
// };

Page.defaultProps = {
  path: '/guides/disinformation/general/'
};

export default Page;
