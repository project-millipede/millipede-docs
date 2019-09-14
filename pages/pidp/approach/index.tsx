import { FC } from 'react';

import MDXContentLoader, { MDXContentLoaderProps } from '../../../docs/src/modules/components/loader/MDXContentLoader';

type Props = MDXContentLoaderProps;

const Page: FC<Props> = ({ path }) => {
  return <MDXContentLoader path={path} />;
};

Page.defaultProps = {
  path: '/pidp/approach/'
};

export default Page;
