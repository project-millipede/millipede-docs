import { Typography } from '@material-ui/core';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';

import { InteractiveHead } from '../../../markdown/components/head';

interface MDXProps extends React.Props<any> {
  id: string;
}

const h1 = ({ children }: MDXProps) => <Typography variant='h1'>{children}</Typography>;
const h2 = ({ children, id }: MDXProps) => (
  <InteractiveHead component='h2' id={id}>
    {children}
  </InteractiveHead>
);
const h3 = ({ children, id }: MDXProps) => (
  <InteractiveHead component='h3' id={id}>
    {children}
  </InteractiveHead>
);
const h4 = ({ children }: MDXProps) => <Typography variant='h4'>{children}</Typography>;
const h5 = ({ children }: MDXProps) => <Typography variant='h5'>{children}</Typography>;
const h6 = ({ children }: MDXProps) => <Typography variant='h6'>{children}</Typography>;

const components = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
};

interface MdxElementProps {
  content: string;
}

const MdxElement = ({ content }: MdxElementProps) => {
  return <MDXProvider components={components}>{content}</MDXProvider>;
};

export default MdxElement;
