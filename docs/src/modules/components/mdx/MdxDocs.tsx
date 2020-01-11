import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { IReadingTime } from 'reading-time-estimator';

import AppContent from '../AppContent';
import AppContentFooter from '../AppContentFooter';
import AppContentHeader from '../AppContentHeader';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import Head from '../Head';
import { useMdStyles } from '../md/styles/MdStyles';
import MdxElement from './MdxElement';

// import AppContentSubHeader from '../AppContentSubHeader';
const useStyles = makeStyles((theme: Theme) => {
  return {
    ...useMdStyles(theme)
    // ...createStyles({
    // })
  };
});

interface MarkdownDocsProps extends React.Props<any> {
  content?: string;
  raw?: string;
  meta?: any;
  timeToRead?: IReadingTime;
  ast?: any;
  headingsMap?: any;
  disableToc?: boolean;
  disableShare?: boolean;
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

  const classes = useStyles({});

  return (
    <AppFrame>
      {/* <Head
        title={`${headers.title || getTitle(markdown)} - Project Millipede`}
        description={headers.description || getDescription(markdown)}
      /> */}
      <Head meta={meta} />
      {!disableToc ? <AppTableOfContents content={raw} /> : null}
      <AppContent disableToc={disableToc}>
        <div className={classes.root}>
          <AppContentHeader />
          {/* <AppContentSubHeader timeToRead={timeToRead} /> */}
          {children || (
            <MdxElement content={content} disableShare={disableShare} />
          )}
          <AppContentFooter />
        </div>
      </AppContent>
    </AppFrame>
  );
};

export default MdxDocs;
