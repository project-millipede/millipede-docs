import { DocsThemeProvider } from '@app/layout';
import { Navigation, PageTypes } from '@app/types';
import { Snackbar } from '@page/components';
import { FC } from 'react';

import { AppContentFooter } from '../components/AppContentFooter';
import { AppContentHeader } from '../components/AppContentHeader';
import { Article, MainContainer } from './MainContainer';

export interface MarkdownDocsProps {
  slug: Array<string>;
  navigation: Navigation;
  metaData: PageTypes.MetaData;
}

export const MdxDocs: FC<MarkdownDocsProps> = ({
  slug,
  navigation,
  metaData,
  children
}) => {
  return (
    <>
      <MainContainer id='app-content'>
        <AppContentHeader
          slug={slug}
          navigation={navigation}
          metaData={metaData}
        />
        <DocsThemeProvider>
          <Article>{children}</Article>
        </DocsThemeProvider>
        <AppContentFooter navigation={navigation} />
      </MainContainer>
      <Snackbar />
    </>
  );
};
