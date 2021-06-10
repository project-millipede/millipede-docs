import { PageTypes } from '@app/types';
import { Snackbar } from '@page/components';
import React, { FC } from 'react';

import { AppContent } from '../components/AppContent';
import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentHeader } from '../components/AppContentHeader';
import { AppHead } from '../components/AppHead';
import { AppTableOfContents } from '../components/AppTableOfContents';
import { useMdxStyles } from './MDXStyles';

interface MarkdownDocsProps {
  raw: string;
  meta: PageTypes.MetaData;
  isMobile: boolean;
}

export const MdxDocs: FC<MarkdownDocsProps> = ({
  raw,
  meta,
  isMobile,
  children
}) => {
  const classes = useMdxStyles();

  const { disableToc, ...restMeta } = meta;

  return (
    <>
      <AppHead meta={restMeta} />
      {!disableToc && <AppTableOfContents content={raw} />}
      <AppContent disableToc={disableToc}>
        {children && (
          <div className={classes.root}>
            {!isMobile && <AppContentHeader />}
            {children}
            <Snackbar />
            <AppContentFooter />
          </div>
        )}
      </AppContent>
    </>
  );
};
