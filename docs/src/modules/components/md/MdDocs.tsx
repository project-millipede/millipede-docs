import { useHoux } from 'houx';
import React from 'react';

import { Page } from '../../../../../src/typings/data/import';
import { RootState } from '../../redux/reducers';
import AppContent from '../AppContent';
import AppContentHeader from '../AppContentHeader';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import Head from '../Head';
import useMarkdownDocsContents from '../useMarkdownDocsContents';
import MdElement from './MdElement';

interface MarkdownDocsProps {
  content: string;
  markdownLocation?: string;
  disableToc?: boolean;
}

export const MdDocs = (props: MarkdownDocsProps) => {
  const { content, markdownLocation: markdownLocationProp, disableToc = false } = props;

  const {
    state: {
      navigation: { activePage }
    }
  }: { state: RootState } = useHoux();

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
      <Head />
      {disableToc ? null : <AppTableOfContents content={content} />}
      <AppContent disableToc={disableToc}>
        <AppContentHeader markdownLocation={markdownLocation} />
        <MdElement content={content} />
      </AppContent>
    </AppFrame>
  );
};

export default MdDocs;
