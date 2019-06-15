import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import mdx from '@mdx-js/mdx';
import React, { useCallback, useEffect, useState } from 'react';
import { animateScroll, scroller } from 'react-scroll';

import AppContent from '../AppContent';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';

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

interface MarkdownDocsProps extends React.Props<any> {
  content?: any;
  meta?: any;
  ast?: any;
  headingsMap?: any;
  raw?: string;
}

const processMDX = async (src: string): Promise<string> => {
  const options = {
    remarkPlugins: [
      // remarkToReact,
      // {
      //   fragment: React.Fragment,
      //   remarkConfigDefault
      // }
    ]
  };

  // const result = await mdx(src, options);

  const result = mdx.sync(src, options);

  /*
  let code = [`import React from 'react'`, `import { mdx } from '@mdx-js/react'`, result].filter(
    Boolean
  );

  let response = code.join("\n");

  return response;
  */

  const code = `/** @jsx mdx */
 import { mdx } from '@mdx-js/react'
 ${result}`;

  return code;
};

export const MDXDocs = (props: MarkdownDocsProps) => {
  const { content, raw } = props;

  const classes = useStyles();

  const [markdownFiles, setMarkdownFiles] = useState("");

  const scrollToLink = (href: string) => {
    scroller.scrollTo(href.slice(1), {
      duration: 600,
      offset: -85,
      delay: 0,
      smooth: "ease",
      containerId: "main-content"
    });
  };

  const scrollTop = () => {
    animateScroll.scrollTo(0, {
      duration: 300,
      offset: -85,
      delay: 0,
      smooth: "ease",
      containerId: "main-content"
    });
  };

  // Working
  useEffect(() => {
    setMarkdownFiles(content as string);
  }, [content, raw]);

  // useEffect(() => {
  //   const generateMDX = async () => {
  //     debugger;
  //     const processor = await transpileMdx();
  //     const file: vfile.VFile = vfile(raw);
  //     const result = await processor.process(file);
  //     setMarkdownFiles(result.contents as string);
  //   };
  //   generateMDX();
  // }, [content, raw]);

  return (
    <AppFrame>
      <AppTableOfContents content={raw} scrollToLink={scrollToLink} />
      <AppContent className={classes.root}>{markdownFiles}</AppContent>
    </AppFrame>
  );
};

export default MDXDocs;
