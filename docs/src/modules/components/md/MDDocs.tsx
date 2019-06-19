import React, { useCallback, useEffect, useState } from 'react';
import { scroller } from 'react-scroll';

import AppContent from '../AppContent';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import Breadcrumbs from '../common/breadcrumbs';
import MarkdownElement from './MarkdownElement';

interface MarkdownDocsProps {
  content: string;
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

export const MDDocs = (props: MarkdownDocsProps) => {
  const { content } = props;
  return (
    <AppFrame>
      <AppTableOfContents content={content} scrollToLink={scrollToLink} />
      <AppContent>
        <Breadcrumbs />
        <MarkdownElement content={content} />
      </AppContent>
    </AppFrame>
  );
};

export default MDDocs;
