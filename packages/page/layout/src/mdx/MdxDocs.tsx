import { Components as ComponentUtils } from '@app/render-utils';
import { PageTypes } from '@app/types';
import { styled } from '@material-ui/core/styles';
import { Snackbar } from '@page/components';
import React, { FC } from 'react';

import { AppContent } from '../components/AppContent';
import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentHeader } from '../components/AppContentHeader';
import { AppHead } from '../components/AppHead';
import { AppTableOfContents } from '../components/AppTableOfContents';

const {
  Media: { Media }
} = ComponentUtils;

interface MarkdownDocsProps {
  raw: string;
  meta: PageTypes.MetaData;
}

export const ContentWrapper = styled('div')(({ theme }) => ({
  fontSize: 16,
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  '& h1': {
    fontSize: 48,
    fontWeight: theme.typography.fontWeightLight,
    margin: 'auto 0'
  },
  '& h2': {
    fontSize: 40,
    fontWeight: theme.typography.fontWeightLight
    // margin: '32px 0 16px'
  },
  '& h3': {
    fontSize: 32,
    fontWeight: theme.typography.fontWeightLight
    // margin: '24px 0 16px'
  },
  '& h4': {
    fontSize: 28,
    fontWeight: theme.typography.fontWeightLight
    // margin: '24px 0 16px'
  },
  '& h5': {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightLight
    // margin: '24px 0 16px'
  },
  '& h6': {
    fontSize: 20,
    fontWeight: theme.typography.fontWeightLight
    // margin: '16px 0 16px'
  },
  '& blockquote': {
    borderLeft: '5px solid #ffe564',
    backgroundColor: 'rgba(255,229,100,0.2)',
    padding: '4px 24px',
    margin: '24px 0',
    '& p': {
      marginTop: '16px'
    }
  },
  '& img': {
    maxWidth: '100%'
  }
}));

export const MdxDocs: FC<MarkdownDocsProps> = ({ raw, meta, children }) => {
  const { disableToc, ...restMeta } = meta;

  return (
    <>
      <AppHead meta={restMeta} />
      {!disableToc && <AppTableOfContents content={raw} />}
      <AppContent disableToc={disableToc}>
        <ContentWrapper>
          <Media greaterThanOrEqual='md'>
            <AppContentHeader />
          </Media>
          {children}
          <Snackbar />
          <AppContentFooter />
        </ContentWrapper>
      </AppContent>
    </>
  );
};
