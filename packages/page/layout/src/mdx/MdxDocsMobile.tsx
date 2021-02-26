import { PageTypes } from '@app/types';
import { Snackbar } from '@page/components';
import React, { FC } from 'react';

import { AppContent } from '../components/AppContent';
import { AppContentFooter } from '../components/AppContentFooter';
import { AppHead } from '../components/AppHead';
import { useMdxStyles } from './MDXStyles';

interface MarkdownDocsProps {
  meta: PageTypes.MetaData;
}

export const MdxDocsMobile: FC<MarkdownDocsProps> = ({ meta, children }) => {
  const classes = useMdxStyles();

  return (
    <>
      <AppHead meta={meta} />
      <AppContent disableToc>
        {children && (
          <div className={classes.root}>
            {children}
            <Snackbar />
            <AppContentFooter />
          </div>
        )}
      </AppContent>
    </>
  );
};
