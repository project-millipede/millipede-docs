import React, { FC } from 'react';

import MDXContentLoader, { MDXContentLoaderProps } from '../../../docs/src/modules/components/loader/MDXContentLoader';

type Props = MDXContentLoaderProps;

const Page: FC<Props> = ({ path }) => {
  return <MDXContentLoader path={path} disableToc />;
};

Page.defaultProps = {
  path: '/rethink-security/attackVectors/comparison/'
};

export default Page;
