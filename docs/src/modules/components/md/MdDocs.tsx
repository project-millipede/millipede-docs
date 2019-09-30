import { useHoux } from 'houx';
import React from 'react';

import { Page } from '../../../../../src/typings/data/import';
import { RootState } from '../../redux/reducers';
import AppContent from '../AppContent';
import AppContentHeader from '../AppContentHeader';
import AppFrame from '../AppFrame';
import AppTableOfContents from '../AppTableOfContents';
import useMarkdownDocsContents from '../useMarkdownDocsContents';
import MdElement from './MdElement';

interface MarkdownDocsProps {
  content: string;
  markdownLocation?: string;
}

export const MdDocs = (props: MarkdownDocsProps) => {
  const { content, markdownLocation: markdownLocationProp } = props;

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
      <AppContent>
        <AppContentHeader markdownLocation={markdownLocation} />
        <MdElement content={content} />
      </AppContent>
      <AppTableOfContents content={content} />
    </AppFrame>
  );
};

export default MdDocs;
