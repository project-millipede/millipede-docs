import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';
import { IReadingTime } from 'reading-time-estimator';

import AppContent from '../AppContent';
import AppContentFooter from '../AppContentFooter';
import AppContentHeader from '../AppContentHeader';
import AppTableOfContents from '../AppTableOfContents';
import Head from '../Head';
import { useMdStyles } from '../md/styles/MdStyles';
import MdxElement from './MdxElement';

// import AppContentSubHeader from '../AppContentSubHeader';
const useStyles = makeStyles((theme: Theme) => {
  return {
    ...useMdStyles(theme)
  };
});

interface MarkdownDocsProps {
  content?: string;
  raw?: string;
  meta?: any;
  timeToRead?: IReadingTime;
  ast?: any;
  headingsMap?: any;
  disableToc?: boolean;
  disableShare?: boolean;
  children?: ReactNode;
}

const MdxDocs = (props: MarkdownDocsProps) => {
  const {
    content,
    raw,
    meta,
    // timeToRead,
    disableToc,
    disableShare,
    children
  } = props;

  const classes = useStyles();

  return (
    <>
      <Head meta={meta} />
      {!disableToc ? <AppTableOfContents content={raw} /> : null}
      <AppContent disableToc={disableToc}>
        <div className={classes.root}>
          <AppContentHeader />
          {/* <AppContentSubHeader timeToRead={timeToRead} /> */}
          {children || (
            <MdxElement
              content={content}
              disableShare={disableShare}
              meta={meta}
            />
          )}
          <AppContentFooter />
        </div>
      </AppContent>
    </>
  );
};

export default MdxDocs;
