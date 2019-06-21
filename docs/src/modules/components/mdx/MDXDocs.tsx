import React, { useEffect, useState } from 'react';

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

export const MdxDocs = (props: MarkdownDocsProps) => {
  const { content, raw, outerClasses = {} } = props;

  const [markdownFiles, setMarkdownFiles] = useState('');

  useEffect(() => {
    setMarkdownFiles(content as string);
  }, [content, raw]);

  return (
    <AppFrame>
      <AppTableOfContents content={raw} />
      <AppContent className={outerClasses.root}>
        <Breadcrumbs />
        {markdownFiles}
      </AppContent>
    </AppFrame>
  );
};

export default MdxDocs;
