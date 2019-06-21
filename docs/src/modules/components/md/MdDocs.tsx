import React from 'react';

import AppContent from '../AppContent';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import Breadcrumbs from '../common/breadcrumbs';
import MdElement from './MdElement';

interface MarkdownDocsProps {
  content: string;
}

export const MdDocs = (props: MarkdownDocsProps) => {
  const { content } = props;
  return (
    <AppFrame>
      <AppTableOfContents content={content} />
      <AppContent>
        <Breadcrumbs />
        <MdElement content={content} />
      </AppContent>
    </AppFrame>
  );
};

export default MdDocs;
