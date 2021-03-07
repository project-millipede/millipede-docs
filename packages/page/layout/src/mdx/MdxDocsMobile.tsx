import { PageTypes } from '@app/types';
import { Snackbar } from '@page/components';
import React, { FC } from 'react';

import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentMobile } from '../components/AppContentMobile';
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
      <AppContentMobile>
        {children && (
          <div className={classes.root}>
            {children}
            <Snackbar />
            <AppContentFooter />
          </div>
        )}
      </AppContentMobile>
    </>
  );
};
