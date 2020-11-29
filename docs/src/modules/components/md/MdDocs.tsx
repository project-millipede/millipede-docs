import { useHoux } from '@app/houx';
import { AppFrame, RootState as LayoutState } from '@app/layout';
import { Page } from '@app/types';
import React from 'react';

import { AppContent } from '../AppContent';
import { AppContentFooter } from '../AppContentFooter';
import { AppContentHeader } from '../AppContentHeader';
import { AppTableOfContents } from '../AppTableOfContents';
import useMarkdownDocsContents from '../useMarkdownDocsContents';
import MdElement from './MdElement';

// import Head from '../Head';
interface MarkdownDocsProps {
  content: string;
  markdownLocation?: string;
  disableToc?: boolean;
}

const MdDocs = (props: MarkdownDocsProps) => {
  const {
    content,
    markdownLocation: markdownLocationProp,
    disableToc = false
  } = props;

  const {
    state: {
      navigation: { activePage }
    }
  }: { state: LayoutState } = useHoux();

  const { markdownLocation } = useMarkdownDocsContents({
    markdown: content,
    markdownLocation: markdownLocationProp,
    activePage: activePage || ({ pathname: '' } as Page)
  });

  return (
    <AppFrame>
      {/* <Head
        title={`${headers.title || getTitle(markdown)} - Project Millipede`}
        description={headers.description || getDescription(markdown)}
      /> */}
      {/* <Head /> */}
      {!disableToc ? <AppTableOfContents content={content} /> : null}
      <AppContent disableToc={disableToc}>
        <AppContentHeader markdownLocation={markdownLocation} />
        <MdElement content={content} />
        <AppContentFooter />
      </AppContent>
    </AppFrame>
  );
};

export default MdDocs;
