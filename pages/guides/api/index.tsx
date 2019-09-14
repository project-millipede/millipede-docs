import { FC } from 'react';

import MDContentLoader, { MDContentLoaderProps } from '../../../docs/src/modules/components/loader/MDContentLoader';

type Props = MDContentLoaderProps;

const Page: FC<Props> = ({ path }) => {
  return <MDContentLoader path={path} />;
};

Page.defaultProps = {
  path: '/guides/api/'
};

export default Page;
