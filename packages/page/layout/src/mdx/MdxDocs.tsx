import { Components as ComponentUtils } from '@app/render-utils';
import { PageTypes } from '@app/types';
import { Snackbar } from '@page/components';
import React, { FC } from 'react';

import { AppContent } from '../components/AppContent';
import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentHeader } from '../components/AppContentHeader';
import { AppHead } from '../components/AppHead';
import { AppTableOfContents } from '../components/AppTableOfContents';
import { MdxContent } from './MdxContent';

const {
  Media: { Media }
} = ComponentUtils;

interface MarkdownDocsProps {
  raw: string;
  meta: PageTypes.MetaData;
}

export const MdxDocs: FC<MarkdownDocsProps> = ({ raw, meta, children }) => {
  const { disableToc, ...restMeta } = meta;

  return (
    <>
      <AppHead meta={restMeta} />
      {!disableToc && <AppTableOfContents content={raw} />}
      <AppContent disableToc={disableToc}>
        <Media greaterThanOrEqual='md'>
          <AppContentHeader />
        </Media>
        <MdxContent>{children}</MdxContent>
        <Snackbar />
        <AppContentFooter />
      </AppContent>
    </>
  );
};
