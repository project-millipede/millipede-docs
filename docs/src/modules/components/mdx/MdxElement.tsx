import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';

import { InteractiveHead } from '../../../markdown/components/head';
import Share from '../common/share';

interface MDXProps extends React.Props<any> {
  id: string;
}

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    headerRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '56px'
    }
  })
);

const h1 = ({ children }: MDXProps) => {
  const classes = useStyles({});
  return (
    <div className={classes.headerRow}>
      <Typography variant='h1' style={{ paddingRight: '16px' }}>
        {children}
      </Typography>
      <Share share={'test share'} />
    </div>
  );
};
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
