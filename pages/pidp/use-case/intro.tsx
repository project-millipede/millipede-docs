import React, { FC } from 'react';

import MDXContentLoader, { MDXContentLoaderProps } from '../../../docs/src/modules/components/loader/MDXContentLoader';

const Page: FC<MDXContentLoaderProps> = ({ path }) => {
  return <MDXContentLoader path={path} disableToc disableShare />;
};

Page.defaultProps = {
  path: '/pidp/use-case/intro/'
};

export default Page;