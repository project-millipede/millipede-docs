import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

import AppContent from '../AppContent';
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
  meta?: any;
  ast?: any;
  headingsMap?: any;
  raw?: string;
  outerClasses?: any;
  disableToc?: boolean;
}

export const MdxDocs = (props: MarkdownDocsProps) => {
  const { content, raw, outerClasses = {}, disableToc = false } = props;

  const classes = useStyles({});

  return (
    <AppFrame>
      {/* <Head
        title={`${headers.title || getTitle(markdown)} - Project Millipede`}
        description={headers.description || getDescription(markdown)}
      /> */}
      <Head />
      {disableToc ? null : <AppTableOfContents content={raw} />}
      <AppContent className={outerClasses.root} disableToc={disableToc}>
        <AppContentHeader />
        <div className={clsx(classes.root, 'markdown-body')}>
          <MdxElement content={content} />
        </div>
      </AppContent>
    </AppFrame>
  );
};

export default MdxDocs;
