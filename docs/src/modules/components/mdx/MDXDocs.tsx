import React, { useCallback, useEffect, useState } from 'react';
import { scroller } from 'react-scroll';

import AppContent from '../AppContent';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import Breadcrumbs from '../common/breadcrumbs';

interface MarkdownDocsProps extends React.Props<any> {
  content?: any;
  meta?: any;
  ast?: any;
  headingsMap?: any;
  raw?: string;
  outerClasses?: any;
}

const scrollToLink = (href: string) => {
  scroller.scrollTo(href.slice(1), {
    duration: 600,
    offset: -85,
    delay: 0,
    smooth: 'ease',
    containerId: 'main-content'
  });
};

export const MDXDocs = (props: MarkdownDocsProps) => {
  const { content, raw, outerClasses = {} } = props;

  const [markdownFiles, setMarkdownFiles] = useState('');

  useEffect(() => {
    setMarkdownFiles(content as string);
  }, [content, raw]);

  return (
    <AppFrame>
      <AppTableOfContents content={raw} scrollToLink={scrollToLink} />
      <AppContent className={outerClasses.root}>
        <Breadcrumbs />
        {markdownFiles}
      </AppContent>
    </AppFrame>
  );
};

export default MDXDocs;
