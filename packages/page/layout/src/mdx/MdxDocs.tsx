import { Components as ComponentUtils } from '@app/render-utils';
import { PageTypes } from '@app/types';
import { Breadcrumbs, Snackbar } from '@page/components';
import React, { FC } from 'react';

import { AppContent } from '../components/AppContent';
import { AppContentFooter } from '../components/AppContentFooter';
import { AppHead } from '../components/AppHead';
import { AppTableOfContents } from '../components/AppTableOfContents';
import { useMdxStyles } from './MDXStyles';

const {
  Media: { Media }
} = ComponentUtils;

interface MarkdownDocsProps {
  raw: string;
  meta: PageTypes.MetaData;
}

export const MdxDocs: FC<MarkdownDocsProps> = ({ raw, meta, children }) => {
  const classes = useMdxStyles();
  const { disableToc, ...restMeta } = meta;

  return (
    <>
      <AppHead meta={restMeta} />
      {!disableToc && <AppTableOfContents content={raw} />}
      <AppContent disableToc={disableToc}>
        {children && (
          <div className={classes.root}>
            <Media greaterThanOrEqual='md'>
              <Breadcrumbs />
            </Media>
            {children}
            <Snackbar />
            <AppContentFooter />
          </div>
        )}
      </AppContent>
    </>
  );
};
