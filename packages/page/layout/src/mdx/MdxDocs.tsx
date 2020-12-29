import { PageTypes } from '@app/types';
import { makeStyles, Theme } from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

import { AppContent } from '../components/AppContent';
import { AppHead } from '../components/AppHead';

// import { AppContentSubHeader } from '../components';
const AppContentHeader = dynamic(() =>
  import('../components/AppContentHeader').then(
    module => module.AppContentHeader
  )
);

const AppTableOfContents = dynamic(() =>
  import('../components/AppTableOfContents').then(
    module => module.AppTableOfContents
  )
);

const AppContentFooter = dynamic(() =>
  import('../components/AppContentFooter').then(
    module => module.AppContentFooter
  )
);

const useStyles = makeStyles((theme: Theme) => {
  return {
    // ...useMdStyles(theme)
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 16,
      color: theme.palette.text.primary,
      '& h1': {
        ...theme.typography.h3,
        fontSize: 40,
        margin: '16px 0'
      },
      '& .description': {
        ...theme.typography.h5,
        margin: '0 0 40px'
      },
      '& h2': {
        ...theme.typography.h4,
        fontSize: 30,
        margin: '40px 0 16px'
      },
      '& h3': {
        ...theme.typography.h5,
        margin: '40px 0 16px'
      },
      '& h4': {
        ...theme.typography.h6,
        margin: '32px 0 16px'
      },
      '& h5': {
        ...theme.typography.subtitle2,
        margin: '32px 0 16px'
      },
      '& p, & ul, & ol': {
        marginTop: 0,
        marginBottom: 16
      },
      '& ul': {
        paddingLeft: 30
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
    }
  };
});

interface MarkdownDocsProps {
  raw: string;
  meta: PageTypes.MetaData;
}

export const MdxDocs: FC<MarkdownDocsProps> = ({ raw, meta, children }) => {
  const classes = useStyles();

  const {
    disableToc,
    // timeToRead,
    ...restMeta
  } = meta;

  return (
    <>
      <AppHead meta={restMeta} />
      {!disableToc ? <AppTableOfContents content={raw} /> : null}
      <AppContent disableToc={disableToc}>
        <div className={classes.root}>
          <AppContentHeader />
          {/* <AppContentSubHeader timeToRead={timeToRead} /> */}
          {children}
          <AppContentFooter />
        </div>
      </AppContent>
    </>
  );
};
