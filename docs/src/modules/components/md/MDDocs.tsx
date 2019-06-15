import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { scroller } from 'react-scroll';

import AppContent from '../AppContent';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import MarkdownElement from './MarkdownElement';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 100
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end"
    },
    markdownElement: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(0, 1)
    }
  })
);

const renderComponent = (Comp: React.FunctionComponent) => <Comp />;

interface MarkdownDocsProps {
  content: string;
}

const scrollToLink = (href: string) => {
  scroller.scrollTo(href.slice(1), {
    duration: 600,
    offset: -85,
    delay: 0,
    smooth: "ease",
    containerId: "main-content"
  });
};

export const MDDocs = (props: MarkdownDocsProps) => {
  const { content } = props;

  const classes = useStyles();

  return (
    // <MarkdownDocsContents
    //   markdown={content}
    //   // markdownLocation={markdownLocationProp}
    // >
    //   {({ contents, markdownLocation }) => (
    <AppFrame>
      <AppTableOfContents content={content} scrollToLink={scrollToLink} />
      <AppContent className={classes.root}>
        <MarkdownElement content={content} />
      </AppContent>
    </AppFrame>
    //   )}
    // </MarkdownDocsContents>
  );
};

export default MDDocs;
