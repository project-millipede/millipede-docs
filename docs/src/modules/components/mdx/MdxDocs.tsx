import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import AppContent from '../AppContent';
import AppContentFooter from '../AppContentFooter';
import AppContentHeader from '../AppContentHeader';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import Head from '../Head';
import { useMdStyles } from '../md/styles/MdStyles';
import MdxElement from './MdxElement';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...useMdStyles(theme),
    ...createStyles({
      header: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
      }
    })
  };
});

interface MarkdownDocsProps extends React.Props<any> {
  content?: string;
  raw?: string;
  meta?: any;
  ast?: any;
  headingsMap?: any;
  disableToc?: boolean;
  disableShare?: boolean;
}

export const MdxDocs = (props: MarkdownDocsProps) => {
  const { content, raw, disableToc, disableShare, children } = props;

  const classes = useStyles({});

  return (
    <AppFrame>
      {/* <Head
        title={`${headers.title || getTitle(markdown)} - Project Millipede`}
        description={headers.description || getDescription(markdown)}
      /> */}
      <Head />
      {!disableToc ? <AppTableOfContents content={raw} /> : null}
      <AppContent>
        <AppContentHeader />
        <div className={clsx(classes.root, 'markdown-body')}>
          {children || <MdxElement content={content} disableShare={disableShare} />}
        </div>
        <AppContentFooter />
      </AppContent>
    </AppFrame>
  );
};

export default MdxDocs;
